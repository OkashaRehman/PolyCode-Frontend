/**
 * Educational PyTorch API shim for browser Pyodide.
 * Covers PolyCode pytorch-py lesson examples (tensors, autograd basics, nn, optim, data).
 * Not a full PyTorch — labeled in output as a browser teaching runtime.
 */

export const TORCH_BROWSER_SHIM = `
import sys
import types
import math
import pickle
from contextlib import contextmanager

import numpy as np

_POLYCODE_TORCH_NOTE = "[PolyCode browser demo · teaching torch shim — not full PyTorch]\\n"


def _as_array(value, dtype=None):
    if isinstance(value, Tensor):
        arr = value._data
    elif isinstance(value, (list, tuple)):
        arr = np.array(value, dtype=dtype or np.float32)
    elif isinstance(value, np.ndarray):
        arr = value.astype(dtype or value.dtype, copy=False)
    elif np.isscalar(value):
        arr = np.array(value, dtype=dtype or np.float32)
    else:
        arr = np.array(value, dtype=dtype or np.float32)
    if dtype is not None:
        arr = arr.astype(dtype, copy=False)
    return np.asarray(arr)


def _wrap(arr, requires_grad=False, parents=None, op=None):
    return Tensor(arr, requires_grad=requires_grad, _parents=parents or [], _op=op)


class Tensor:
    def __init__(self, data, requires_grad=False, dtype=None, _parents=None, _op=None):
        if isinstance(data, Tensor):
            self._data = data._data.copy()
            requires_grad = requires_grad or data.requires_grad
        else:
            self._data = _as_array(data, dtype=dtype)
        self.requires_grad = bool(requires_grad)
        self.grad = None
        self._parents = list(_parents or [])
        self._op = _op
        self.device = "cpu"

    @property
    def shape(self):
        return tuple(self._data.shape)

    @property
    def dtype(self):
        return self._data.dtype

    @property
    def data(self):
        return self

    def numpy(self):
        return np.array(self._data, copy=True)

    def item(self):
        return self._data.item()

    def detach(self):
        return Tensor(self._data.copy(), requires_grad=False)

    def clone(self):
        return Tensor(self._data.copy(), requires_grad=self.requires_grad)

    def to(self, device):
        out = Tensor(self._data.copy(), requires_grad=self.requires_grad)
        out.device = str(device)
        return out

    def size(self, dim=None):
        if dim is None:
            return self.shape
        return self.shape[dim]

    def dim(self):
        return self._data.ndim

    def __repr__(self):
        return f"tensor({np.array2string(self._data, precision=4, floatmode='fixed')})"

    def __str__(self):
        return self.__repr__()

    def __len__(self):
        return self._data.shape[0]

    def __getitem__(self, key):
        return _wrap(self._data[key], requires_grad=self.requires_grad)

    def __iter__(self):
        for i in range(len(self)):
            yield self[i]

    def _binary(self, other, op_name, np_op, reverse=False):
        a = self if not reverse else other
        b = other if not reverse else self
        a_t = a if isinstance(a, Tensor) else _wrap(a)
        b_t = b if isinstance(b, Tensor) else _wrap(b)
        out = np_op(a_t._data, b_t._data)
        needs = a_t.requires_grad or b_t.requires_grad
        return _wrap(out, requires_grad=needs, parents=[a_t, b_t] if needs else [], op=op_name)

    def __add__(self, other):
        return self._binary(other, "add", np.add)

    def __radd__(self, other):
        return self._binary(other, "add", np.add, reverse=True)

    def __sub__(self, other):
        return self._binary(other, "sub", np.subtract)

    def __rsub__(self, other):
        return self._binary(other, "sub", np.subtract, reverse=True)

    def __mul__(self, other):
        return self._binary(other, "mul", np.multiply)

    def __rmul__(self, other):
        return self._binary(other, "mul", np.multiply, reverse=True)

    def __truediv__(self, other):
        return self._binary(other, "div", np.divide)

    def __rtruediv__(self, other):
        return self._binary(other, "div", np.divide, reverse=True)

    def __pow__(self, other):
        return self._binary(other, "pow", np.power)

    def __neg__(self):
        return self * (-1)

    def mean(self, dim=None, keepdim=False):
        out = self._data.mean(axis=dim, keepdims=keepdim)
        return _wrap(out, requires_grad=self.requires_grad, parents=[self] if self.requires_grad else [], op="mean")

    def sum(self, dim=None, keepdim=False):
        out = self._data.sum(axis=dim, keepdims=keepdim)
        return _wrap(out, requires_grad=self.requires_grad, parents=[self] if self.requires_grad else [], op="sum")

    def argmax(self, dim=None):
        if dim is None:
            return _wrap(np.array(self._data.argmax()))
        return _wrap(self._data.argmax(axis=dim))

    def reshape(self, *shape):
        if len(shape) == 1 and isinstance(shape[0], (tuple, list)):
            shape = tuple(shape[0])
        return _wrap(self._data.reshape(shape), requires_grad=self.requires_grad)

    def view(self, *shape):
        return self.reshape(*shape)

    def zero_(self):
        self._data[...] = 0
        return self

    def backward(self, gradient=None):
        if gradient is None:
            if self._data.size != 1:
                raise RuntimeError("grad can be implicitly created only for scalar outputs")
            gradient = np.ones_like(self._data, dtype=np.float32)
        else:
            gradient = _as_array(gradient, dtype=np.float32)

        stack = [(self, gradient)]
        while stack:
            node, grad = stack.pop()
            if not isinstance(node, Tensor):
                continue
            if node.requires_grad:
                if node.grad is None:
                    node.grad = _wrap(np.zeros_like(node._data, dtype=np.float32))
                node.grad._data = node.grad._data + grad

            if not node._parents:
                continue

            op = node._op
            parents = node._parents
            if op == "add" and len(parents) == 2:
                a, b = parents
                stack.append((a, _broadcast_grad(grad, a._data.shape)))
                stack.append((b, _broadcast_grad(grad, b._data.shape)))
            elif op == "sub" and len(parents) == 2:
                a, b = parents
                stack.append((a, _broadcast_grad(grad, a._data.shape)))
                stack.append((b, _broadcast_grad(-grad, b._data.shape)))
            elif op == "mul" and len(parents) == 2:
                a, b = parents
                stack.append((a, _broadcast_grad(grad * b._data, a._data.shape)))
                stack.append((b, _broadcast_grad(grad * a._data, b._data.shape)))
            elif op == "div" and len(parents) == 2:
                a, b = parents
                stack.append((a, _broadcast_grad(grad / b._data, a._data.shape)))
                stack.append((b, _broadcast_grad(-grad * a._data / (b._data ** 2), b._data.shape)))
            elif op == "pow" and len(parents) == 2:
                a, b = parents
                stack.append((a, _broadcast_grad(grad * b._data * (a._data ** (b._data - 1)), a._data.shape)))
            elif op in ("mean", "sum") and len(parents) == 1:
                a = parents[0]
                if op == "mean":
                    g = grad * (1.0 / max(a._data.size, 1))
                    g = np.broadcast_to(np.asarray(g), a._data.shape).copy()
                else:
                    g = np.broadcast_to(np.asarray(grad), a._data.shape).copy()
                stack.append((a, g))
            elif op == "relu" and len(parents) == 1:
                a = parents[0]
                stack.append((a, grad * (a._data > 0)))
            elif op == "linear" and len(parents) == 3:
                x, w, b = parents
                # node = x @ w.T + b ; w shape (out, in)
                stack.append((x, grad @ w._data))
                stack.append((w, grad.T @ x._data))
                stack.append((b, grad.sum(axis=0)))
            elif op == "mse" and len(parents) == 2:
                pred, target = parents
                n = max(pred._data.size, 1)
                stack.append((pred, (2.0 / n) * (pred._data - target._data) * grad))
            elif op == "ce" and len(parents) == 2:
                logits, target = parents
                probs = _softmax(logits._data)
                g = probs.copy()
                if target._data.ndim == 1:
                    rows = np.arange(g.shape[0])
                    g[rows, target._data.astype(int)] -= 1
                g = g / max(g.shape[0], 1)
                stack.append((logits, g * grad))


def _broadcast_grad(grad, shape):
    g = np.asarray(grad, dtype=np.float32)
    while g.ndim > len(shape):
        g = g.sum(axis=0)
    for axis, size in enumerate(shape):
        if size == 1 and g.shape[axis] != 1:
            g = g.sum(axis=axis, keepdims=True)
    return np.broadcast_to(g, shape).copy()


def _softmax(x):
    z = x - x.max(axis=-1, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=-1, keepdims=True)


float32 = np.float32
float64 = np.float64
float16 = np.float16
bfloat16 = np.float16
int64 = np.int64
long = np.int64


def tensor(data, dtype=None, requires_grad=False):
    return Tensor(data, dtype=dtype, requires_grad=requires_grad)


def zeros(*shape, dtype=None):
    if len(shape) == 1 and isinstance(shape[0], (tuple, list)):
        shape = tuple(shape[0])
    return Tensor(np.zeros(shape, dtype=dtype or np.float32))


def ones(*shape, dtype=None):
    if len(shape) == 1 and isinstance(shape[0], (tuple, list)):
        shape = tuple(shape[0])
    return Tensor(np.ones(shape, dtype=dtype or np.float32))


def rand(*shape):
    if len(shape) == 1 and isinstance(shape[0], (tuple, list)):
        shape = tuple(shape[0])
    return Tensor(np.random.random(shape).astype(np.float32))


def randn(*shape):
    if len(shape) == 1 and isinstance(shape[0], (tuple, list)):
        shape = tuple(shape[0])
    return Tensor(np.random.randn(*shape).astype(np.float32))


def from_numpy(arr):
    return Tensor(np.asarray(arr))


def relu(x):
    x = x if isinstance(x, Tensor) else tensor(x)
    out = np.maximum(x._data, 0)
    return _wrap(out, requires_grad=x.requires_grad, parents=[x] if x.requires_grad else [], op="relu")


def softmax(x, dim=-1):
    x = x if isinstance(x, Tensor) else tensor(x)
    arr = x._data
    axis = dim if dim >= 0 else arr.ndim + dim
    if axis != arr.ndim - 1:
        arr = np.moveaxis(arr, axis, -1)
        out = _softmax(arr)
        out = np.moveaxis(out, -1, axis)
    else:
        out = _softmax(arr)
    return _wrap(out, requires_grad=x.requires_grad, parents=[x] if x.requires_grad else [], op="softmax")


@contextmanager
def no_grad():
    yield


class _Cuda:
    @staticmethod
    def is_available():
        return False


cuda = _Cuda()


def save(obj, path):
    payload = obj
    if hasattr(obj, "items"):
        payload = {k: (v._data if isinstance(v, Tensor) else v) for k, v in obj.items()}
    with open(path, "wb") as f:
        pickle.dump(payload, f)


def load(path):
    with open(path, "rb") as f:
        payload = pickle.load(f)
    if isinstance(payload, dict):
        return {k: (Tensor(v) if isinstance(v, np.ndarray) else v) for k, v in payload.items()}
    return payload


class Parameter(Tensor):
    def __init__(self, data):
        super().__init__(data, requires_grad=True)


class Module:
    def __init__(self):
        self._modules = {}
        self._parameters = {}

    def __setattr__(self, name, value):
        if name in ("_modules", "_parameters"):
            object.__setattr__(self, name, value)
            return
        if isinstance(value, Parameter):
            self._parameters[name] = value
        if isinstance(value, Module):
            self._modules[name] = value
        object.__setattr__(self, name, value)

    def parameters(self):
        params = list(self._parameters.values())
        for mod in self._modules.values():
            params.extend(list(mod.parameters()))
        # also scan attributes for Parameter / Module
        for key, value in self.__dict__.items():
            if key.startswith("_"):
                continue
            if isinstance(value, Parameter) and value not in params:
                params.append(value)
            if isinstance(value, Module):
                for p in value.parameters():
                    if p not in params:
                        params.append(p)
            if isinstance(value, list):
                for item in value:
                    if isinstance(item, Module):
                        for p in item.parameters():
                            if p not in params:
                                params.append(p)
        return params

    def state_dict(self):
        out = {}
        for i, p in enumerate(self.parameters()):
            out[f"param_{i}"] = p
        # named Linear weights
        for key, value in self.__dict__.items():
            if isinstance(value, Linear):
                out[f"{key}.weight"] = value.weight
                out[f"{key}.bias"] = value.bias
            if isinstance(value, Sequential):
                for idx, layer in enumerate(value.layers):
                    if isinstance(layer, Linear):
                        out[f"{key}.{idx}.weight"] = layer.weight
                        out[f"{key}.{idx}.bias"] = layer.bias
        return out

    def load_state_dict(self, state):
        # best-effort match by Linear attrs
        for key, value in self.__dict__.items():
            if isinstance(value, Linear):
                w = state.get(f"{key}.weight")
                b = state.get(f"{key}.bias")
                if w is not None:
                    value.weight._data = _as_array(w if not isinstance(w, Tensor) else w._data)
                if b is not None:
                    value.bias._data = _as_array(b if not isinstance(b, Tensor) else b._data)
            if isinstance(value, Sequential):
                for idx, layer in enumerate(value.layers):
                    if isinstance(layer, Linear):
                        w = state.get(f"{key}.{idx}.weight")
                        b = state.get(f"{key}.{idx}.bias")
                        if w is not None:
                            layer.weight._data = _as_array(w if not isinstance(w, Tensor) else w._data)
                        if b is not None:
                            layer.bias._data = _as_array(b if not isinstance(b, Tensor) else b._data)
        return self

    def __call__(self, *args, **kwargs):
        return self.forward(*args, **kwargs)

    def forward(self, *args, **kwargs):
        raise NotImplementedError


class Linear(Module):
    def __init__(self, in_features, out_features):
        super().__init__()
        scale = 1.0 / math.sqrt(in_features)
        self.weight = Parameter(np.random.uniform(-scale, scale, (out_features, in_features)).astype(np.float32))
        self.bias = Parameter(np.zeros(out_features, dtype=np.float32))

    def forward(self, x):
        x = x if isinstance(x, Tensor) else tensor(x)
        out = x._data @ self.weight._data.T + self.bias._data
        needs = x.requires_grad or self.weight.requires_grad or self.bias.requires_grad
        return _wrap(out, requires_grad=needs, parents=[x, self.weight, self.bias], op="linear")


class ReLU(Module):
    def forward(self, x):
        return relu(x)


class Sequential(Module):
    def __init__(self, *layers):
        super().__init__()
        self.layers = list(layers)

    def forward(self, x):
        for layer in self.layers:
            x = layer(x)
        return x

    def parameters(self):
        params = []
        for layer in self.layers:
            if isinstance(layer, Module):
                params.extend(list(layer.parameters()))
        return params


class Conv2d(Module):
    def __init__(self, in_channels, out_channels, kernel_size, stride=1, padding=0):
        super().__init__()
        if isinstance(kernel_size, int):
            kh = kw = kernel_size
        else:
            kh, kw = kernel_size
        self.stride = stride
        self.padding = padding
        scale = 1.0 / math.sqrt(in_channels * kh * kw)
        self.weight = Parameter(
            np.random.uniform(-scale, scale, (out_channels, in_channels, kh, kw)).astype(np.float32)
        )
        self.bias = Parameter(np.zeros(out_channels, dtype=np.float32))

    def forward(self, x):
        x = x if isinstance(x, Tensor) else tensor(x)
        n, c, h, w = x._data.shape
        oc, _, kh, kw = self.weight._data.shape
        pad = self.padding
        if pad:
            xpad = np.pad(x._data, ((0, 0), (0, 0), (pad, pad), (pad, pad)))
        else:
            xpad = x._data
        oh = (xpad.shape[2] - kh) // self.stride + 1
        ow = (xpad.shape[3] - kw) // self.stride + 1
        out = np.zeros((n, oc, oh, ow), dtype=np.float32)
        for bi in range(n):
            for oc_i in range(oc):
                for i in range(oh):
                    for j in range(ow):
                        hs = i * self.stride
                        ws = j * self.stride
                        window = xpad[bi, :, hs : hs + kh, ws : ws + kw]
                        out[bi, oc_i, i, j] = np.sum(window * self.weight._data[oc_i]) + self.bias._data[oc_i]
        return _wrap(out)


class MSELoss(Module):
    def forward(self, pred, target):
        pred = pred if isinstance(pred, Tensor) else tensor(pred)
        target = target if isinstance(target, Tensor) else tensor(target)
        diff = pred._data - target._data
        out = np.mean(diff * diff)
        needs = pred.requires_grad or target.requires_grad
        return _wrap(out, requires_grad=needs, parents=[pred, target], op="mse")


class CrossEntropyLoss(Module):
    def forward(self, logits, target):
        logits = logits if isinstance(logits, Tensor) else tensor(logits)
        target = target if isinstance(target, Tensor) else tensor(target)
        probs = _softmax(logits._data)
        if target._data.ndim == 1:
            rows = np.arange(probs.shape[0])
            chosen = probs[rows, target._data.astype(int)]
        else:
            chosen = np.sum(probs * target._data, axis=-1)
        loss = -np.mean(np.log(np.clip(chosen, 1e-8, 1.0)))
        return _wrap(loss, requires_grad=True, parents=[logits, target], op="ce")


class _SGD:
    def __init__(self, params, lr=0.01):
        self.params = list(params)
        self.lr = lr

    def zero_grad(self):
        for p in self.params:
            p.grad = None

    def step(self):
        for p in self.params:
            if p.grad is None:
                continue
            p._data = p._data - self.lr * p.grad._data


class _Optim:
    SGD = _SGD


class Dataset:
    def __len__(self):
        raise NotImplementedError

    def __getitem__(self, index):
        raise NotImplementedError


class DataLoader:
    def __init__(self, dataset, batch_size=1, shuffle=False):
        self.dataset = dataset
        self.batch_size = batch_size
        self.shuffle = shuffle

    def __iter__(self):
        indices = list(range(len(self.dataset)))
        if self.shuffle:
            np.random.shuffle(indices)
        for start in range(0, len(indices), self.batch_size):
            batch_idx = indices[start : start + self.batch_size]
            items = [self.dataset[i] for i in batch_idx]
            if not items:
                continue
            if isinstance(items[0], (tuple, list)):
                cols = list(zip(*items))
                yield tuple(_stack_batch(col) for col in cols)
            else:
                yield _stack_batch(items)


def _stack_batch(items):
    arrays = [_as_array(x if not isinstance(x, Tensor) else x._data) for x in items]
    return Tensor(np.stack(arrays, axis=0))


# Build module tree
torch = types.ModuleType("torch")
torch.__version__ = "2.x-polycode-browser"
torch.Tensor = Tensor
torch.tensor = tensor
torch.zeros = zeros
torch.ones = ones
torch.rand = rand
torch.randn = randn
torch.from_numpy = from_numpy
torch.relu = relu
torch.softmax = softmax
torch.no_grad = no_grad
torch.cuda = cuda
torch.save = save
torch.load = load
torch.float32 = float32
torch.float64 = float64
torch.float16 = float16
torch.bfloat16 = bfloat16
torch.int64 = int64
torch.long = long

nn = types.ModuleType("torch.nn")
nn.Module = Module
nn.Linear = Linear
nn.ReLU = ReLU
nn.Sequential = Sequential
nn.Conv2d = Conv2d
nn.MSELoss = MSELoss
nn.CrossEntropyLoss = CrossEntropyLoss
nn.Parameter = Parameter

optim = types.ModuleType("torch.optim")
optim.SGD = _SGD

utils = types.ModuleType("torch.utils")
data = types.ModuleType("torch.utils.data")
data.Dataset = Dataset
data.DataLoader = DataLoader
utils.data = data

torch.nn = nn
torch.optim = optim
torch.utils = utils

sys.modules["torch"] = torch
sys.modules["torch.nn"] = nn
sys.modules["torch.optim"] = optim
sys.modules["torch.utils"] = utils
sys.modules["torch.utils.data"] = data
`;

export function codeUsesTorch(source = "") {
  return /^\s*(?:import|from)\s+torch\b/m.test(source);
}

/**
 * Educational Hugging Face `transformers` API shim for browser Pyodide.
 * Simulates `pipeline()` for the tasks used across the PolyCode huggingface-py
 * lessons (sentiment-analysis, text-generation, question-answering,
 * summarization, zero-shot-classification, ner, fill-mask) using deterministic
 * heuristics — not real model inference. `AutoTokenizer` and
 * `AutoModelForSequenceClassification` are also simulated (tokenize/encode/
 * decode, `.config.num_labels`/`.id2label`, `.name_or_path`, `.parameters()`/
 * `.half()`, and a sentiment-biased forward pass) so the AutoModel/AutoTokenizer
 * lessons run end to end in the browser. `AutoModel`, `AutoConfig`,
 * `AutoModelForCausalLM`, `Trainer`, `TrainingArguments`, and
 * `BitsAndBytesConfig` stay importable so code doesn't crash on
 * `from transformers import X`, but using them raises a clear "needs a real
 * Python environment" error, since real weights/training/quantization can't
 * run in a browser sandbox.
 */

export const TRANSFORMERS_BROWSER_SHIM = `
import re
import types
import sys
import hashlib

_POLYCODE_TRANSFORMERS_NOTE = "[PolyCode browser demo · teaching transformers shim — not real model inference]\\n"


def _polycode_stable_unit(text, salt=""):
    h = hashlib.md5((salt + "::" + str(text)).encode("utf-8")).hexdigest()
    return int(h[:8], 16) / 0xFFFFFFFF


_POLYCODE_POSITIVE_WORDS = {
    "love", "loved", "loving", "great", "amazing", "excellent", "good", "awesome",
    "fantastic", "wonderful", "best", "happy", "perfect", "easy", "enjoy", "enjoyed",
    "nice", "like", "liked", "brilliant", "beautiful", "fun", "impressive", "helpful",
    "cool", "delightful", "smooth", "positive", "success", "successful",
}

_POLYCODE_NEGATIVE_WORDS = {
    "hate", "hated", "terrible", "bad", "awful", "worst", "horrible", "poor",
    "difficult", "sad", "broken", "annoying", "boring", "disappointing", "disappointed",
    "ugly", "wrong", "fail", "failed", "failure", "slow", "confusing", "useless",
    "negative", "problem", "issue", "hard",
}

_POLYCODE_STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were", "in", "on", "at", "to", "of",
    "for", "and", "or", "that", "this", "it", "with", "by", "from", "as", "be",
    "has", "have", "do", "does", "did", "what", "where", "who", "when", "why",
    "how", "which",
}

_POLYCODE_GENERATION_CONTINUATIONS = [
    "and the world would never be the same again.",
    "no one could have predicted what happened next.",
    "everything changed the moment the door creaked open.",
    "the story was only just beginning.",
    "it was the start of an adventure no one expected.",
    "the answer had been there all along, waiting to be found.",
]

_POLYCODE_FILL_MASK_CANDIDATES = ["good", "great", "important", "different", "new", "possible"]


def _polycode_tokenize_words(text):
    return re.findall(r"[A-Za-z']+", str(text).lower())


def _polycode_split_sentences(text):
    parts = re.split(r"(?<=[.!?])\\s+", str(text).strip())
    return [p for p in parts if p]


def _polycode_first_words(text, n):
    words = str(text).strip().split()
    return " ".join(words[:n])


def _polycode_sentiment_label_score(text):
    words = _polycode_tokenize_words(text)
    pos = sum(w in _POLYCODE_POSITIVE_WORDS for w in words)
    neg = sum(w in _POLYCODE_NEGATIVE_WORDS for w in words)
    bias = _polycode_stable_unit(text, "sentiment") * 0.08
    if pos == 0 and neg == 0:
        label = "POSITIVE" if _polycode_stable_unit(text, "neutral") > 0.5 else "NEGATIVE"
        score = 0.55 + bias
    elif pos >= neg:
        label = "POSITIVE"
        score = min(0.999, 0.75 + 0.06 * (pos - neg) + bias)
    else:
        label = "NEGATIVE"
        score = min(0.999, 0.75 + 0.06 * (neg - pos) + bias)
    return label, round(score, 4)


class _PolycodePipeline:
    def __init__(self, task, model=None, **kwargs):
        self.task = task
        self.model = model or "(default)"
        impl = _POLYCODE_PIPELINE_TASKS.get(task)
        if impl is None:
            supported = ", ".join(sorted(_POLYCODE_PIPELINE_TASKS.keys()))
            raise ValueError(
                f'pipeline("{task}") is not simulated in this browser demo. '
                f"Simulated tasks: {supported}. "
                f"For other tasks, try this code with \`pip install transformers\` locally or on Google Colab."
            )
        self._impl = impl

    def __call__(self, *args, **kwargs):
        return self._impl(self, *args, **kwargs)

    def __repr__(self):
        return f"<transformers.pipeline '{self.task}' model={self.model!r} · PolyCode browser demo>"


def _polycode_run_sentiment(pl, inputs, **kwargs):
    texts = inputs if isinstance(inputs, list) else [inputs]
    out = []
    for t in texts:
        label, score = _polycode_sentiment_label_score(t)
        out.append({"label": label, "score": score})
    return out


def _polycode_run_generation(pl, prompt, max_new_tokens=20, **kwargs):
    try:
        n_words = max(4, int(max_new_tokens) // 2)
    except (TypeError, ValueError):
        n_words = 10
    idx = int(_polycode_stable_unit(prompt, "gen") * len(_POLYCODE_GENERATION_CONTINUATIONS))
    tail = _POLYCODE_GENERATION_CONTINUATIONS[idx % len(_POLYCODE_GENERATION_CONTINUATIONS)]
    tail_words = tail.split()[:n_words]
    generated = (str(prompt).rstrip() + " " + " ".join(tail_words)).strip()
    return [{"generated_text": generated}]


def _polycode_run_qa(pl, *args, question=None, context=None, **kwargs):
    if (question is None or context is None) and args and isinstance(args[0], dict):
        question = args[0].get("question", question)
        context = args[0].get("context", context)
    question = question or ""
    context = context or ""
    sentences = _polycode_split_sentences(context) or [context]
    q_words = set(_polycode_tokenize_words(question)) - _POLYCODE_STOPWORDS
    best = sentences[0]
    best_overlap = -1
    for s in sentences:
        overlap = len(q_words & set(_polycode_tokenize_words(s)))
        if overlap > best_overlap:
            best_overlap = overlap
            best = s
    answer = best.strip()
    start = context.find(answer)
    if start < 0:
        start = 0
    end = start + len(answer)
    score = round(min(0.98, 0.5 + 0.12 * best_overlap + _polycode_stable_unit(question + context, "qa") * 0.05), 4)
    return {"score": score, "start": start, "end": end, "answer": answer}


def _polycode_run_summarization(pl, inputs, **kwargs):
    texts = inputs if isinstance(inputs, list) else [inputs]
    out = []
    for t in texts:
        sentences = _polycode_split_sentences(t)
        if len(sentences) > 1:
            summary = sentences[0].strip()
        else:
            words = str(t).split()
            summary = _polycode_first_words(t, max(8, len(words) // 2)).strip()
        out.append({"summary_text": summary})
    return out


def _polycode_run_zero_shot(pl, sequences, candidate_labels=None, **kwargs):
    candidate_labels = candidate_labels if candidate_labels is not None else kwargs.get("candidate_labels", [])
    text = sequences if isinstance(sequences, str) else (sequences[0] if sequences else "")
    text_words = set(_polycode_tokenize_words(text))
    scored = []
    for label in candidate_labels:
        label_words = set(_polycode_tokenize_words(label))
        overlap = len(text_words & label_words)
        base = _polycode_stable_unit(text + "::" + str(label), "zsc")
        scored.append((label, overlap + base))
    scored.sort(key=lambda x: x[1], reverse=True)
    raw_scores = [s for _, s in scored]
    total = sum(raw_scores) or 1.0
    norm_scores = [round(s / total, 4) for s in raw_scores]
    return {
        "sequence": text,
        "labels": [l for l, _ in scored],
        "scores": norm_scores,
    }


def _polycode_run_ner(pl, inputs, **kwargs):
    text = inputs if isinstance(inputs, str) else (inputs[0] if inputs else "")
    entities = []
    for m in re.finditer(r"\\b([A-Z][a-zA-Z]*(?:\\s+[A-Z][a-zA-Z]*)*)\\b", text):
        word = m.group(1)
        if word.lower() in _POLYCODE_STOPWORDS:
            continue
        entities.append({
            "entity_group": "MISC",
            "score": round(0.7 + _polycode_stable_unit(word, "ner") * 0.25, 4),
            "word": word,
            "start": m.start(),
            "end": m.end(),
        })
    return entities


def _polycode_run_fill_mask(pl, inputs, **kwargs):
    mask_token = None
    for candidate in ("[MASK]", "<mask>"):
        if candidate in inputs:
            mask_token = candidate
            break
    if mask_token is None:
        return []
    out = []
    for i, word in enumerate(_POLYCODE_FILL_MASK_CANDIDATES):
        seq = inputs.replace(mask_token, word, 1)
        out.append({
            "sequence": seq,
            "score": round(max(0.01, 0.5 - i * 0.08 + _polycode_stable_unit(inputs, f"mask{i}") * 0.05), 4),
            "token_str": word,
        })
    return out


_POLYCODE_PIPELINE_TASKS = {
    "sentiment-analysis": _polycode_run_sentiment,
    "text-classification": _polycode_run_sentiment,
    "text-generation": _polycode_run_generation,
    "question-answering": _polycode_run_qa,
    "summarization": _polycode_run_summarization,
    "zero-shot-classification": _polycode_run_zero_shot,
    "ner": _polycode_run_ner,
    "token-classification": _polycode_run_ner,
    "fill-mask": _polycode_run_fill_mask,
}


def pipeline(task, model=None, **kwargs):
    return _PolycodePipeline(task, model=model, **kwargs)


_POLYCODE_SPECIAL_IDS = {"[PAD]": 0, "[UNK]": 100, "[CLS]": 101, "[SEP]": 102}
_POLYCODE_ID_TO_SPECIAL = {v: k for k, v in _POLYCODE_SPECIAL_IDS.items()}
_POLYCODE_TOK_VOCAB = {}

_POLYCODE_KNOWN_PARAM_COUNTS = {
    "distilbert-base-uncased-finetuned-sst-2-english": 66955010,
    "distilbert-base-uncased": 66362880,
    "bert-base-uncased": 109482240,
    "bert-base-cased": 108310272,
    "roberta-base": 124645632,
    "gpt2": 124439808,
}


def _polycode_token_id(token):
    if token in _POLYCODE_SPECIAL_IDS:
        return _POLYCODE_SPECIAL_IDS[token]
    tid = 1000 + int(_polycode_stable_unit(token, "vocab") * 28000)
    _POLYCODE_TOK_VOCAB[tid] = token
    return tid


def _polycode_flatten_ids(ids):
    if hasattr(ids, "_data"):
        ids = ids.numpy().tolist()
    elif hasattr(ids, "tolist"):
        ids = ids.tolist()
    out = []

    def _walk(x):
        if isinstance(x, (list, tuple)):
            for item in x:
                _walk(item)
        else:
            out.append(int(x))

    _walk(ids if isinstance(ids, (list, tuple)) else [ids])
    return out


def _polycode_param_count_for(name):
    base = str(name).rstrip("/").split("/")[-1]
    if base in _POLYCODE_KNOWN_PARAM_COUNTS:
        return _POLYCODE_KNOWN_PARAM_COUNTS[base]
    unit = _polycode_stable_unit(base, "paramcount")
    return int(20_000_000 + unit * 100_000_000)


class _PolycodeAutoConfig:
    def __init__(self, name, num_labels=None):
        base = str(name).rstrip("/").split("/")[-1]
        is_sst2 = "sst-2" in base or "sst2" in base
        self.num_labels = num_labels if num_labels is not None else 2
        if is_sst2 and self.num_labels == 2:
            self.id2label = {0: "NEGATIVE", 1: "POSITIVE"}
        else:
            self.id2label = {i: f"LABEL_{i}" for i in range(self.num_labels)}
        self.label2id = {v: k for k, v in self.id2label.items()}
        self.model_type = base.split("-")[0] if base else "model"

    def __repr__(self):
        return f"PolycodeAutoConfig(num_labels={self.num_labels})"


class _PolycodeFakeParam:
    def __init__(self, n, dtype="float32"):
        self._numel = n
        self.dtype = dtype
        self.requires_grad = True

    def numel(self):
        return self._numel

    def __repr__(self):
        return f"Parameter(numel={self._numel}, dtype={self.dtype})"


class _PolycodeSequenceClassifierOutput:
    def __init__(self, logits):
        self.logits = logits

    def __getitem__(self, key):
        if key in (0, "logits"):
            return self.logits
        raise KeyError(key)


def _polycode_bias_logits_from_ids(input_ids, num_labels, id2label):
    flat = [t for t in _polycode_flatten_ids(input_ids) if t not in _POLYCODE_ID_TO_SPECIAL]
    words = [_POLYCODE_TOK_VOCAB.get(t, "").lstrip("#") for t in flat]
    text = " ".join(w for w in words if w)
    pos_idx = next((k for k, v in id2label.items() if v == "POSITIVE"), None)
    neg_idx = next((k for k, v in id2label.items() if v == "NEGATIVE"), None)
    if num_labels == 2 and pos_idx is not None and neg_idx is not None:
        label, score = _polycode_sentiment_label_score(text)
        hi = 2.0 + 3.0 * score
        vals = [0.0, 0.0]
        vals[pos_idx if label == "POSITIVE" else neg_idx] = hi
        vals[neg_idx if label == "POSITIVE" else pos_idx] = -hi
        return vals
    seed = sum(flat) or 1
    return [
        round((_polycode_stable_unit(f"{seed}:{i}", "logits") - 0.5) * 4, 4)
        for i in range(num_labels)
    ]


class _PolycodeAutoModelForSequenceClassification:
    def __init__(self, name, num_labels=None):
        self.name_or_path = str(name)
        self.config = _PolycodeAutoConfig(name, num_labels=num_labels)
        self._fake_params = [_PolycodeFakeParam(_polycode_param_count_for(name))]

    def parameters(self):
        return iter(self._fake_params)

    def half(self):
        for p in self._fake_params:
            p.dtype = "float16"
        return self

    def eval(self):
        return self

    def train(self, mode=True):
        return self

    def to(self, device):
        return self

    def __call__(self, *args, input_ids=None, attention_mask=None, **kwargs):
        if input_ids is None and args:
            first = args[0]
            input_ids = first.get("input_ids") if isinstance(first, dict) else first
        vals = _polycode_bias_logits_from_ids(
            input_ids, self.config.num_labels, self.config.id2label
        )
        try:
            logits = Tensor([vals])
        except NameError as e:
            raise ImportError(
                "Calling a transformers model in this browser demo needs \`import torch\` "
                "(the teaching torch shim provides the tensor output)."
            ) from e
        return _PolycodeSequenceClassifierOutput(logits)


class _PolycodeAutoTokenizer:
    def __init__(self, name):
        self.name_or_path = str(name)

    def tokenize(self, text):
        pieces = re.findall(r"[A-Za-z]+|[0-9]+|[^\\sA-Za-z0-9]", str(text))
        tokens = []
        for w in pieces:
            if w.isalpha() and len(w) > 6:
                cut = max(2, len(w) // 2)
                tokens.append(w[:cut].lower())
                tokens.append("##" + w[cut:].lower())
            else:
                tokens.append(w.lower())
        return tokens

    def convert_tokens_to_ids(self, tokens):
        return [_polycode_token_id(t) for t in tokens]

    def encode(self, text, add_special_tokens=True, **kwargs):
        ids = self.convert_tokens_to_ids(self.tokenize(text))
        if add_special_tokens:
            ids = [_POLYCODE_SPECIAL_IDS["[CLS]"]] + ids + [_POLYCODE_SPECIAL_IDS["[SEP]"]]
        return ids

    def decode(self, ids, skip_special_tokens=False, **kwargs):
        words = []
        for tid in _polycode_flatten_ids(ids):
            if tid in _POLYCODE_ID_TO_SPECIAL:
                if not skip_special_tokens:
                    words.append(_POLYCODE_ID_TO_SPECIAL[tid])
                continue
            tok = _POLYCODE_TOK_VOCAB.get(tid, "[UNK]")
            if tok.startswith("##") and words:
                words[-1] = words[-1] + tok[2:]
            elif len(tok) == 1 and not tok.isalnum() and words:
                words[-1] = words[-1] + tok
            else:
                words.append(tok)
        return " ".join(words)

    def __call__(
        self,
        text,
        return_tensors=None,
        add_special_tokens=True,
        padding=False,
        truncation=False,
        **kwargs,
    ):
        ids = self.encode(text, add_special_tokens=add_special_tokens)
        mask = [1] * len(ids)
        if return_tensors == "pt":
            try:
                return {"input_ids": Tensor([ids]), "attention_mask": Tensor([mask])}
            except NameError as e:
                raise ImportError(
                    'tokenizer(..., return_tensors="pt") needs \`import torch\` in this '
                    "browser demo (the teaching torch shim provides the tensor output)."
                ) from e
        return {"input_ids": ids, "attention_mask": mask}


class _PolycodeAutoTokenizerFactory:
    @staticmethod
    def from_pretrained(name, *args, **kwargs):
        return _PolycodeAutoTokenizer(name)


class _PolycodeAutoModelForSequenceClassificationFactory:
    @staticmethod
    def from_pretrained(name, *args, num_labels=None, **kwargs):
        return _PolycodeAutoModelForSequenceClassification(name, num_labels=num_labels)


class _PolycodeUnsupportedTransformersAPI:
    """Stands in for AutoTokenizer / Trainer / etc. so \`from transformers import X\`
    keeps working, but any real use raises one clear, friendly error instead of a
    raw AttributeError or a giant unrelated traceback."""

    def __init__(self, name):
        self._polycode_name = name

    def _polycode_boom(self, *_args, **_kwargs):
        raise ImportError(
            f"transformers.{self._polycode_name} needs a real Python environment — this "
            f"browser demo simulates pipeline() (sentiment-analysis, text-generation, "
            f"question-answering, summarization, zero-shot-classification, ner, fill-mask) "
            f"plus AutoTokenizer/AutoModelForSequenceClassification, but not "
            f"{self._polycode_name} (real weights/training/quantization can't run in a "
            f"browser sandbox). Try this code with \`pip install transformers\` locally or "
            f"on Google Colab."
        )

    def __call__(self, *args, **kwargs):
        self._polycode_boom()

    def __getattr__(self, attr):
        if attr.startswith("__") and attr.endswith("__"):
            raise AttributeError(attr)
        return self._polycode_boom


_polycode_transformers_mod = types.ModuleType("transformers")
_polycode_transformers_mod.__version__ = "4.x-polycode-browser-demo"
_polycode_transformers_mod.pipeline = pipeline
_polycode_transformers_mod.AutoTokenizer = _PolycodeAutoTokenizerFactory
_polycode_transformers_mod.AutoModelForSequenceClassification = (
    _PolycodeAutoModelForSequenceClassificationFactory
)
for _polycode_name in (
    "AutoModel",
    "AutoConfig",
    "AutoModelForCausalLM",
    "AutoModelForTokenClassification",
    "AutoModelForQuestionAnswering",
    "TrainingArguments",
    "Trainer",
    "BitsAndBytesConfig",
):
    setattr(_polycode_transformers_mod, _polycode_name, _PolycodeUnsupportedTransformersAPI(_polycode_name))
sys.modules["transformers"] = _polycode_transformers_mod
`;

export function codeUsesTransformers(source = "") {
  return /^\s*(?:import|from)\s+transformers\b/m.test(source);
}

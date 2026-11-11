// Plain-English learning outcomes per Hugging Face lesson (shown at top of theory view).

export const HUGGINGFACE_LESSON_OUTCOMES = {
  "hf-0": [
    "Explain what Hugging Face is and why it's the hub of the open ML ecosystem",
    "Name the core libraries: Transformers, Tokenizers, Datasets, and the Hub",
    "Spot real products built on Hugging Face models",
  ],
  "hf-1": [
    "Install the `transformers` package with pip",
    "Run your first `pipeline()` call in a few lines",
    "Know what a pipeline hides from you (model, tokenizer, pre/post-processing)",
  ],
  "hf-2": [
    "Pick the right task name for `pipeline()`",
    "Read the list of dicts that a pipeline returns",
    "Swap in a different model with the `model=` argument",
  ],
  "hf-3": [
    "Load a model with `AutoModelForSequenceClassification.from_pretrained()`",
    "Load a matching tokenizer with `AutoTokenizer.from_pretrained()`",
    "See why `Auto*` classes save you from picking the exact architecture class",
  ],
  "hf-4": [
    "Turn tokenizer output into model logits",
    "Convert logits to probabilities with softmax",
    "Map a predicted class index back to a human label with `id2label`",
  ],
  "hf-5": [
    "Explain subword tokenization in plain words",
    "Compare word-level, character-level, and subword tokenizers",
    "Recognize WordPiece and BPE by name",
  ],
  "hf-6": [
    "Call a tokenizer directly on text to get `input_ids` and `attention_mask`",
    "Decode token ids back into readable text",
    "Inspect individual tokens with `.tokenize()`",
  ],
  "hf-7": [
    "Pad and truncate batches of text to a fixed length",
    "Understand why `attention_mask` exists",
    "Return PyTorch tensors from a tokenizer call",
  ],
  "hf-8": [
    "Load a dataset from the Hub with `load_dataset()`",
    "Read a dataset's splits (train/validation/test)",
    "Preview a single example from a split",
  ],
  "hf-9": [
    "Inspect `features` to see a dataset's columns and types",
    "Slice and index into a `Dataset` object",
    "Shuffle and select a small sample for quick experiments",
  ],
  "hf-10": [
    "Use `.map()` to tokenize a whole dataset in one pass",
    "Use `.filter()` to drop rows that do not match a condition",
    "Remove and rename columns to prepare data for training",
  ],
  "hf-11": [
    "Search the Hugging Face Hub for a model by task",
    "Read a model card for intended use, limitations, and license",
    "Pick between a base model and a task-specific checkpoint",
  ],
  "hf-12": [
    "Load any Hub model by its repo id with `from_pretrained()`",
    "Know where downloaded models are cached locally",
    "Pin a specific model revision for reproducibility",
  ],
  "hf-13": [
    "Log in to the Hub with `huggingface_hub.login()`",
    "Push a model and tokenizer with `push_to_hub()`",
    "Understand what gets uploaded to your Hub repo",
  ],
  "hf-14": [
    "Configure a training run with `TrainingArguments`",
    "Wire up a `Trainer` with model, args, and datasets",
    "Call `.train()` and read the logged loss",
  ],
  "hf-15": [
    "Load a metric with the `evaluate` library",
    "Write a `compute_metrics` function for the Trainer",
    "Read accuracy/F1 results after evaluation",
  ],
  "hf-16": [
    "Combine tokenized data, a Trainer, and metrics into one fine-tuning run",
    "Save a fine-tuned model to disk",
    "Reload a fine-tuned model for inference",
  ],
  "hf-17": [
    "Explain why full fine-tuning is expensive for large models",
    "Describe the idea behind parameter-efficient fine-tuning (PEFT)",
    "Name LoRA as one popular PEFT method",
  ],
  "hf-18": [
    "Build a `LoraConfig` with rank, alpha, and target modules",
    "Wrap a base model with `get_peft_model()`",
    "Check how few parameters LoRA actually trains with `print_trainable_parameters()`",
  ],
  "hf-19": [
    "Train a LoRA-wrapped model with the same Trainer workflow",
    "Save only the small LoRA adapter weights",
    "Reload a base model and attach a saved adapter",
  ],
  "hf-20": [
    "Explain quantization as trading numeric precision for memory",
    "Compare float32, float16, int8, and int4 storage roughly",
    "Know when quantization helps you fit a bigger model",
  ],
  "hf-21": [
    "Load a model in 8-bit with `load_in_8bit=True`",
    "Load a model in 4-bit with `BitsAndBytesConfig`",
    "Understand the memory vs. speed/accuracy tradeoff",
  ],
  "hf-22": [
    "Configure `BitsAndBytesConfig` for 4-bit NF4 quantization",
    "Combine quantized loading with a LoRA adapter (QLoRA idea)",
    "Recognize this pattern as how large models get fine-tuned on modest GPUs",
  ],
  "hf-23": [
    "Combine pipeline, tokenizer, dataset, and Trainer into one mini project",
    "Fine-tune a small classifier end-to-end on a tiny dataset",
    "Push the finished model to the Hub",
  ],
  "hf-24": [
    "Review the core Hugging Face vocabulary from pipelines to QLoRA",
    "Use a cheat sheet of common imports and patterns",
    "Plan your next steps after this course",
  ],
};

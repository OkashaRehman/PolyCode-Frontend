// PolyCode — Hugging Face (Python) full curriculum
// 9 chapters · 25 lessons · Python coding challenges
// YouTube links: edit huggingfaceVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { HUGGINGFACE_VIDEO_LINKS } from "./huggingfaceVideoLinks";
import { HUGGINGFACE_LESSON_OUTCOMES } from "./huggingfaceLessonOutcomes";

export const HUGGINGFACE_CHAPTERS = [
  {
    id: "intro",
    title: `Meet Hugging Face`,
    icon: "🤗",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-0",
        title: `What is Hugging Face?`,
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              `Before Hugging Face existed, using someone else's trained model meant reading a research paper, hunting down the author's GitHub repo, matching exact versions of NumPy and PyTorch, and hoping the weights file was still hosted somewhere. **Hugging Face** replaced that scavenger hunt with a shared standard: one Hub with 500,000+ pretrained **models**, ready-made **datasets**, and Python libraries (\`transformers\`, \`datasets\`, \`tokenizers\`, \`huggingface_hub\`) that all speak the same format. A model trained by a research lab, a startup, or you personally can be loaded the exact same way — \`from_pretrained(name)\` — because everyone commits to the same interface.`,
          },
          {
            type: "scenario",
            title: `Adding review sentiment to an app`,
            content:
              `Your app collects product reviews and you want a "positive / negative" badge on each one. Instead of training a model from scratch, you can download an already-trained model from the Hub and run it in a few lines.`,
          },
          {
            type: "diagram",
            title: `The Hugging Face ecosystem`,
            nodes: [
              {
                id: "hub",
                label: `Hub`,
                color: "#FF9D00",
                items: [`Models`, `Datasets`, `Spaces`],
              },
              {
                id: "libs",
                label: `Libraries`,
                color: "#FFB84D",
                items: [`transformers`, `tokenizers`, `datasets`],
              },
              {
                id: "app",
                label: `Your app`,
                color: "#FFD180",
                items: [`pipeline() calls`, `Fine-tuned models`],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Everything in this course installs with \`pip install transformers datasets\`. No account is required to load public models.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Your first pipeline`,
            content: `from transformers import pipeline

classifier = pipeline("sentiment-analysis")
print(classifier("Hugging Face makes NLP easy!"))`,
          },
          {
            type: "quiz",
            question: `What does Hugging Face mainly provide?`,
            options: [
              `A hosted SQL database`,
              `Pretrained ML models, datasets, and libraries to use them`,
              `A JavaScript UI framework`,
              `A video editing tool`,
            ],
            answer: 1,
            explanation:
              `Hugging Face hosts models and datasets on its Hub, plus Python libraries (transformers, datasets, tokenizers) to use them easily.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Your First Pipeline`,
          description:
            `Import \`pipeline\` from \`transformers\`, create \`classifier = pipeline("sentiment-analysis")\`, and print the result of classifying \`"I love this course!"\`.`,
          starterCode: `# Import pipeline
# Create classifier and print a result

`,
          solutionCode: `from transformers import pipeline

classifier = pipeline("sentiment-analysis")
print(classifier("I love this course!"))`,
          tests: [
            {
              id: 1,
              label: `Imports pipeline`,
              keywords: [{ pattern: `from\\s+transformers\\s+import\\s+pipeline` }],
            },
            {
              id: 2,
              label: `Creates a sentiment-analysis pipeline`,
              keywords: [{ pattern: `pipeline\\s*\\(\\s*["']sentiment-analysis["']` }],
            },
            {
              id: 3,
              label: `Prints a classification`,
              keywords: [{ pattern: `print\\s*\\(\\s*classifier\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-1",
        title: `Installing & pipeline() quickstart`,
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              `Install once with **\`pip install transformers\`**. When you call \`pipeline("sentiment-analysis")\` with no \`model=\` argument, transformers looks up that task in an internal table and picks a sensible **default model** — one that's small enough to download quickly and good enough for a first try. The library then reads that model's \`config.json\` to figure out which model class and tokenizer to instantiate automatically. All of this happens behind one function call, and the downloaded files are cached so every call after the first is instant and works offline.`,
          },
          {
            type: "scenario",
            title: `Hackathon prototype`,
            content:
              `You have two hours to demo an idea. \`pipeline()\` lets you go from "I need text generation" to working code without picking an architecture, writing training code, or hosting anything.`,
          },
          {
            type: "table",
            title: `Manual approach vs. pipeline()`,
            columns: [`Step`, `Without pipeline()`, `With pipeline()`],
            rows: [
              { label: `Choose model`, values: [`Choose model`, `Research architectures`, `Skip — default picked for you`] },
              { label: `Tokenize`, values: [`Tokenize`, `Write encode/decode code`, `Handled internally`] },
              { label: `Post-process`, values: [`Post-process`, `Apply softmax, map labels`, `Handled internally`] },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `The first pipeline call for a task downloads model weights from the Hub — it needs an internet connection and can take a moment.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Pick a specific model`,
            content: `from transformers import pipeline

generator = pipeline(
    "text-generation",
    model="distilgpt2",
)
print(generator("Once upon a time", max_new_tokens=20))`,
          },
          {
            type: "quiz",
            question: `What happens the first time you run pipeline("sentiment-analysis")?`,
            options: [
              `Nothing, it fails without a model argument`,
              `It downloads and caches a default model for that task`,
              `It trains a new model from scratch`,
              `It only works offline`,
            ],
            answer: 1,
            explanation:
              `Every task has a sensible default model that pipeline() downloads and caches on first use.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Text Generation Pipeline`,
          description:
            `Create \`generator = pipeline("text-generation", model="distilgpt2")\` and print the result of generating from \`"Once upon a time"\` with \`max_new_tokens=20\`.`,
          starterCode: `from transformers import pipeline

`,
          solutionCode: `from transformers import pipeline

generator = pipeline("text-generation", model="distilgpt2")
print(generator("Once upon a time", max_new_tokens=20))`,
          tests: [
            {
              id: 1,
              label: `Creates a text-generation pipeline`,
              keywords: [{ pattern: `pipeline\\s*\\(\\s*["']text-generation["']` }],
            },
            {
              id: 2,
              label: `Passes max_new_tokens`,
              keywords: [{ pattern: `max_new_tokens\\s*=` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "transformers",
    title: `Transformers Library`,
    icon: "🧩",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-2",
        title: `The pipeline() function`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `\`pipeline(task)\` wraps three steps into one call: **tokenize** the input into numbers, **run the model** to get raw output, and **post-process** that output into something readable — a label, an answer string, a shorter paragraph. Tokenization looks almost the same across every task, but post-processing is where tasks really differ: sentiment analysis applies softmax and picks a label, question-answering finds the best start/end token span in the context, summarization decodes generated tokens back into text word by word. The pipeline hides all of that task-specific logic so you can focus on the input and output. Pass a list of strings instead of one to process a whole batch in a single call.`,
          },
          {
            type: "scenario",
            title: `Support ticket triage`,
            content:
              `A helpdesk gets hundreds of tickets a day. A \`"zero-shot-classification"\` or \`"sentiment-analysis"\` pipeline can sort them into buckets before a human even opens the queue.`,
          },
          {
            type: "table",
            title: `Common pipeline tasks`,
            columns: [`Task name`, `What it does`],
            rows: [
              { label: `sentiment-analysis`, values: [`sentiment-analysis`, `Label text as positive/negative`] },
              { label: `summarization`, values: [`summarization`, `Shorten a long passage`] },
              { label: `question-answering`, values: [`question-answering`, `Extract an answer span from context`] },
              { label: `ner`, values: [`ner`, `Find names, places, organizations`] },
              { label: `fill-mask`, values: [`fill-mask`, `Predict a missing word`] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Pass a list instead of a single string — \`classifier(["Great!", "Terrible."])\` — to classify a whole batch in one call.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Question answering`,
            content: `from transformers import pipeline

qa = pipeline("question-answering")
result = qa(
    question="Where is the Hugging Face Hub?",
    context="The Hugging Face Hub is a website that hosts models and datasets.",
)
print(result["answer"])`,
          },
          {
            type: "quiz",
            question: `What does a sentiment-analysis pipeline return for a batch of texts?`,
            options: [
              `A single averaged score`,
              `A list of dicts, one per input text`,
              `A raw tensor of logits`,
              `Nothing — batches are not supported`,
            ],
            answer: 1,
            explanation:
              `Pipelines return one result dict (label + score) per input, in the same order as the input list.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Summarize a Paragraph`,
          description:
            `Create \`summarizer = pipeline("summarization")\` and print the result of summarizing a short paragraph of your choice.`,
          starterCode: `from transformers import pipeline

`,
          solutionCode: `from transformers import pipeline

summarizer = pipeline("summarization")
text = "Hugging Face provides open source tools for natural language processing, including pretrained models and datasets that make it easy to build ML applications quickly."
print(summarizer(text))`,
          tests: [
            {
              id: 1,
              label: `Creates a summarization pipeline`,
              keywords: [{ pattern: `pipeline\\s*\\(\\s*["']summarization["']` }],
            },
            {
              id: 2,
              label: `Prints a summary`,
              keywords: [{ pattern: `print\\s*\\(\\s*summarizer\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-3",
        title: `AutoModel & AutoTokenizer`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `Most transformer models share the same core body — the stack of attention layers that builds up a representation of the input. What changes between tasks is the small **head** on top: a classification head outputs class scores, a token-classification head outputs one label per token, a language-modeling head outputs a probability over the next word. **\`Auto*\`** classes read a model's \`config.json\` and automatically build the right body-plus-head combination for you — \`AutoModelForSequenceClassification\` loads a model with a classification head, \`AutoTokenizer\` loads whichever tokenizer class (WordPiece, BPE, SentencePiece...) that model was actually trained with. You never have to know or guess which exact classes those are.`,
          },
          {
            type: "scenario",
            title: `Swapping models without rewriting code`,
            content:
              `Today you use a small DistilBERT model. Next month you want to try a bigger RoBERTa checkpoint. With \`Auto*\` classes, you only change the model name string — the loading code stays the same.`,
          },
          {
            type: "diagram",
            title: `Loading a model pair`,
            nodes: [
              {
                id: "name",
                label: `Model name`,
                color: "#FF9D00",
                items: [`"distilbert-base-..."`],
              },
              {
                id: "tok",
                label: `AutoTokenizer`,
                color: "#FFB84D",
                items: [`.from_pretrained(name)`],
              },
              {
                id: "mod",
                label: `AutoModel...`,
                color: "#FFD180",
                items: [`.from_pretrained(name)`],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              `\`from_pretrained()\` downloads weights once and caches them locally — later calls with the same name load from disk.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Load a matching pair`,
            content: `from transformers import AutoTokenizer, AutoModelForSequenceClassification

name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)
print(model.config.num_labels)`,
          },
          {
            type: "quiz",
            question: `Why use AutoTokenizer instead of a specific tokenizer class?`,
            options: [
              `It is faster at runtime`,
              `It picks the correct tokenizer class for whatever model name you give it`,
              `It skips downloading files`,
              `It only works with images`,
            ],
            answer: 1,
            explanation:
              `Auto* classes inspect the model name/config and instantiate the matching class for you.`,
          },
          {
            type: "quiz",
            question: `What is the key difference between using Auto* classes versus manually choosing tokenizer and model classes?`,
            options: [
              `Auto* classes are slower but more flexible`,
              `Auto* classes read the model's config and automatically select the correct tokenizer and model classes for you`,
              `Auto* classes only work with small models`,
              `Auto* classes require manual configuration of vocabulary size`,
            ],
            answer: 1,
            explanation:
              `Auto* classes inspect the model's config.json and automatically instantiate the matching tokenizer class (WordPiece, BPE, etc.) and model head — you never need to guess or manually select them.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load Tokenizer and Model`,
          description:
            `Import \`AutoTokenizer\` and \`AutoModelForSequenceClassification\`. Load both from \`"distilbert-base-uncased-finetuned-sst-2-english"\` and print \`model.config.num_labels\`.`,
          starterCode: `from transformers import AutoTokenizer, AutoModelForSequenceClassification

`,
          solutionCode: `from transformers import AutoTokenizer, AutoModelForSequenceClassification

name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)
print(model.config.num_labels)`,
          tests: [
            {
              id: 1,
              label: `Loads tokenizer with from_pretrained`,
              keywords: [{ pattern: `AutoTokenizer\\.from_pretrained\\s*\\(` }],
            },
            {
              id: 2,
              label: `Loads model with from_pretrained`,
              keywords: [{ pattern: `AutoModelForSequenceClassification\\.from_pretrained\\s*\\(` }],
            },
            {
              id: 3,
              label: `Prints num_labels`,
              keywords: [{ pattern: `print\\s*\\(\\s*model\\.config\\.num_labels\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "hf-4",
        title: `Under the hood: logits, softmax, labels`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `A model call returns raw **logits** — one real number per class, which can be negative, huge, or tiny, and carry no direct "probability" meaning on their own. **Softmax** fixes that: it exponentiates every logit (so nothing is negative) and divides by the sum (so everything adds up to exactly 1), turning arbitrary scores into a genuine probability distribution. Once you have probabilities, \`argmax\` just finds the index of the biggest one, and \`id2label\` — a small dictionary baked into the model's config — translates that index back into a word like \`"POSITIVE"\`. This whole sequence — tokenize, run the model, softmax, argmax, id2label — is exactly what \`pipeline("sentiment-analysis")\` was doing for you automatically back in Lesson 2. Now you're doing it by hand, which means you can also change any step of it.`,
          },
          {
            type: "scenario",
            title: `Debugging a pipeline result`,
            content:
              `A pipeline returns \`{"label": "POSITIVE", "score": 0.99}\` — this is exactly what you get by manually running the model, applying softmax, and looking up the class name.`,
          },
          {
            type: "diagram",
            title: `From text to label`,
            nodes: [
              {
                id: "tok",
                label: `Tokenizer`,
                color: "#FF9D00",
                items: [`input_ids`, `attention_mask`],
              },
              {
                id: "mod",
                label: `Model`,
                color: "#FFB84D",
                items: [`raw logits`],
              },
              {
                id: "post",
                label: `Post-process`,
                color: "#FFD180",
                items: [`softmax`, `argmax`, `id2label`],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Wrap inference in \`torch.no_grad()\` — you are not training, so skip gradient tracking to save memory.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Manual inference`,
            content: `from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)

inputs = tokenizer("I love this!", return_tensors="pt")
with torch.no_grad():
    outputs = model(**inputs)

probs = torch.softmax(outputs.logits, dim=-1)
label_id = probs.argmax().item()
print(model.config.id2label[label_id])`,
          },
          {
            type: "quiz",
            question: `What does softmax do to a model's logits?`,
            options: [
              `Deletes negative values`,
              `Converts them into probabilities that sum to 1`,
              `Sorts them alphabetically`,
              `Trains the model further`,
            ],
            answer: 1,
            explanation:
              `Softmax exponentiates and normalizes logits so they behave like a probability distribution over classes.`,
          },
          {
            type: "quiz",
            question: `What is the complete sequence of transformations that happens during manual inference from text to final label?`,
            options: [
              `Text → Logits → Label directly without any processing`,
              `Text → Tokenizer (ids) → Model (logits) → Softmax → Argmax → id2label lookup`,
              `Text → Padding → Model only, no need for softmax`,
              `Text → Logits → Softmax only, argmax is optional`,
            ],
            answer: 1,
            explanation:
              `Manual inference follows this exact pipeline: tokenization converts text to ids, the model produces raw logits, softmax converts logits to probabilities, argmax finds the highest probability index, and id2label maps that index to a readable class name like 'POSITIVE'.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Manual Prediction`,
          description:
            `Tokenize \`"I love this!"\` with \`return_tensors="pt"\`, run the model, apply \`torch.softmax\`, get the \`argmax\`, and print the label via \`model.config.id2label\`.`,
          starterCode: `from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)

`,
          solutionCode: `from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)

inputs = tokenizer("I love this!", return_tensors="pt")
with torch.no_grad():
    outputs = model(**inputs)

probs = torch.softmax(outputs.logits, dim=-1)
label_id = probs.argmax().item()
print(model.config.id2label[label_id])`,
          tests: [
            {
              id: 1,
              label: `Uses return_tensors="pt"`,
              keywords: [{ pattern: `return_tensors\\s*=\\s*["']pt["']` }],
            },
            {
              id: 2,
              label: `Applies softmax`,
              keywords: [{ pattern: `torch\\.softmax\\s*\\(` }],
            },
            {
              id: 3,
              label: `Uses id2label`,
              keywords: [{ pattern: `id2label` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "tokenizers",
    title: `Tokenizers`,
    icon: "✂️",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-5",
        title: `What tokenization does`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `Models cannot read raw text — they read numbers. **Tokenization** splits text into pieces (tokens) and maps each to an id from a fixed **vocabulary**. The size of that vocabulary is a real engineering tradeoff: a tiny vocabulary of whole words can't cover every word in the language, so it constantly hits words it has never seen ("out of vocabulary"); a vocabulary of every possible word would be enormous and mostly wasted on rare words the model barely ever sees. Modern tokenizers split the difference with **subwords** — common words like "the" or "run" stay whole as single tokens, while rare or unfamiliar words get broken into smaller, reusable pieces the model already knows. This keeps the vocabulary small (often 30,000–50,000 entries) while still being able to represent literally any string, even made-up words or typos.`,
          },
          {
            type: "scenario",
            title: `Handling a word the model never saw`,
            content:
              `"unhappiness" might not be in the vocabulary as one piece, but a subword tokenizer can split it into known pieces like "un", "happi", "ness" — so the model still gets useful signal instead of one big "unknown" token.`,
          },
          {
            type: "table",
            title: `Tokenization strategies`,
            columns: [`Strategy`, `Splits on`, `Example models`],
            rows: [
              { label: `Word-level`, values: [`Word-level`, `Whitespace`, `Older, huge vocabularies`] },
              { label: `Character-level`, values: [`Character-level`, `Single characters`, `Very long sequences`] },
              { label: `Subword (WordPiece)`, values: [`Subword (WordPiece)`, `Frequent word pieces`, `BERT, DistilBERT`] },
              { label: `Subword (BPE)`, values: [`Subword (BPE)`, `Byte-pair merges`, `GPT-2, RoBERTa`] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Special tokens like \`[CLS]\` and \`[SEP]\` (BERT-style) mark the start of a sequence and separate segments — the model was trained expecting them.`,
          },
          {
            type: "code",
            lang: "python",
            label: `See the pieces`,
            content: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer.tokenize("Hugging Face is great!")
print(tokens)`,
          },
          {
            type: "quiz",
            question: `Why do modern tokenizers use subwords instead of whole words?`,
            options: [
              `Subwords are always shorter to type`,
              `They keep the vocabulary small while still handling rare or unseen words`,
              `Models cannot process whole words at all`,
              `Subwords remove the need for a vocabulary`,
            ],
            answer: 1,
            explanation:
              `Subword tokenization balances vocabulary size against the ability to represent any word by combining known pieces.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Tokenize a Sentence`,
          description:
            `Load \`AutoTokenizer.from_pretrained("bert-base-uncased")\` and print \`tokenizer.tokenize("Hugging Face is great!")\`.`,
          starterCode: `from transformers import AutoTokenizer

`,
          solutionCode: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer.tokenize("Hugging Face is great!")
print(tokens)`,
          tests: [
            {
              id: 1,
              label: `Loads a tokenizer`,
              keywords: [{ pattern: `AutoTokenizer\\.from_pretrained\\s*\\(` }],
            },
            {
              id: 2,
              label: `Calls .tokenize()`,
              keywords: [{ pattern: `\\.tokenize\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-6",
        title: `Using AutoTokenizer (encode/decode)`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `Lesson 5's \`.tokenize()\` stopped at readable strings like \`["hugging", "face"]\` — useful for inspecting what a tokenizer sees, but not something a model can consume. Calling the tokenizer directly — \`tokenizer(text)\` — goes all the way: it tokenizes, converts each piece to its integer id, and automatically inserts the special tokens the model was trained to expect (like \`[CLS]\` at the start and \`[SEP]\` at the end for BERT-style models). The result is a dict with **\`input_ids\`** (the token numbers, ready to feed a model) and **\`attention_mask\`** (which positions are real content). **\`.decode()\`** runs the whole thing in reverse, turning ids back into a readable string — handy for double-checking that encoding did what you expected.`,
          },
          {
            type: "scenario",
            title: `Round-tripping a sentence`,
            content:
              `Encoding then decoding the same text should give you back (roughly) the original sentence, plus any special tokens the model expects — a good sanity check when debugging.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Encode and decode`,
            content: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
encoded = tokenizer("Hugging Face is great!")
print(encoded["input_ids"])
print(tokenizer.decode(encoded["input_ids"]))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Use \`tokenizer.decode(ids, skip_special_tokens=True)\` when you want clean output without \`[CLS]\`/\`[SEP]\` markers.`,
          },
          {
            type: "quiz",
            question: `What does tokenizer.decode() do?`,
            options: [
              `Converts token ids back into readable text`,
              `Trains the tokenizer on new text`,
              `Deletes the tokenizer's vocabulary`,
              `Only works on images`,
            ],
            answer: 0,
            explanation:
              `decode() is the inverse of encoding — it maps ids back to a string.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Encode Then Decode`,
          description:
            `Encode \`"Hugging Face is great!"\`, print \`encoded["input_ids"]\`, then print \`tokenizer.decode(encoded["input_ids"])\`.`,
          starterCode: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

`,
          solutionCode: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
encoded = tokenizer("Hugging Face is great!")
print(encoded["input_ids"])
print(tokenizer.decode(encoded["input_ids"]))`,
          tests: [
            {
              id: 1,
              label: `Prints input_ids`,
              keywords: [{ pattern: `print\\s*\\(\\s*encoded\\[["']input_ids["']\\]\\s*\\)` }],
            },
            {
              id: 2,
              label: `Decodes the ids`,
              keywords: [{ pattern: `tokenizer\\.decode\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-7",
        title: `Padding, truncation & batches`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `Models process a batch as one big rectangular tensor of numbers, and a tensor can't have rows of different lengths — so every sequence in a batch must be the **same length**. **\`padding=True\`** fills the shorter sequences with a special pad token until every row matches the longest one; **\`truncation=True\`** cuts sequences that are longer than the model's maximum (often 512 tokens) so they don't error out. Padding solves the shape problem, but it also adds fake tokens that carry no real meaning — that's exactly what **\`attention_mask\`** is for: a 1/0 map the model uses internally to ignore padded positions completely, so they don't distort the result. This is also *why* batching is worth the trouble at all: a GPU can multiply one padded (batch, seq_len) tensor through the model far faster than it can run each sequence through one at a time.`,
          },
          {
            type: "scenario",
            title: `Batching reviews of different lengths`,
            content:
              `"Great!" and a three-sentence review cannot sit in the same tensor unless one is padded — padding makes both rows the same width so they can be stacked.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Pad and truncate a batch`,
            content: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
batch = tokenizer(
    ["Great!", "This movie was way too long and I fell asleep."],
    padding=True,
    truncation=True,
    return_tensors="pt",
)
print(batch["input_ids"].shape)
print(batch["attention_mask"])`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Without \`attention_mask\`, the model would treat padding tokens as real input and get confused — always pass the mask along to the model.`,
          },
          {
            type: "quiz",
            question: `What does the attention_mask mark?`,
            options: [
              `Which words are nouns`,
              `Which tokens are real content vs. padding`,
              `Which layer to use in the model`,
              `The learning rate`,
            ],
            answer: 1,
            explanation:
              `attention_mask is 1 for real tokens and 0 for padding, so the model can ignore the padding.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Pad a Batch`,
          description:
            `Tokenize \`["Great!", "This movie was way too long and I fell asleep."]\` with \`padding=True\`, \`truncation=True\`, \`return_tensors="pt"\`. Print \`batch["input_ids"].shape\`.`,
          starterCode: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

`,
          solutionCode: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
batch = tokenizer(
    ["Great!", "This movie was way too long and I fell asleep."],
    padding=True,
    truncation=True,
    return_tensors="pt",
)
print(batch["input_ids"].shape)`,
          tests: [
            {
              id: 1,
              label: `Uses padding=True`,
              keywords: [{ pattern: `padding\\s*=\\s*True` }],
            },
            {
              id: 2,
              label: `Uses truncation=True`,
              keywords: [{ pattern: `truncation\\s*=\\s*True` }],
            },
            {
              id: 3,
              label: `Returns PyTorch tensors`,
              keywords: [{ pattern: `return_tensors\\s*=\\s*["']pt["']` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "datasets",
    title: `Datasets Library`,
    icon: "📚",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-8",
        title: `load_dataset() basics`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `Loading data the old way usually means downloading a CSV or JSON file, writing a parser, handling encoding quirks, and manually splitting it into train/test sets. The **\`datasets\`** library skips all of that: **\`load_dataset(name)\`** downloads a dataset that's already been cleaned, validated, and split by its publisher, and returns it as a \`DatasetDict\` with named **splits** like \`train\`, \`validation\`, and \`test\` ready to use. Under the hood, datasets are stored in the Apache Arrow format and memory-mapped from disk rather than fully loaded into RAM — which is why you can work with datasets far larger than your computer's memory without it slowing to a crawl.`,
          },
          {
            type: "scenario",
            title: `Skipping the download-and-parse chore`,
            content:
              `Instead of downloading a CSV, writing a parser, and handling edge cases, \`load_dataset("imdb")\` gives you a ready-to-use, already-split movie review dataset in one line.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Load and preview`,
            content: `from datasets import load_dataset

dataset = load_dataset("imdb")
print(dataset)
print(dataset["train"][0])`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Datasets are cached locally after the first download, just like models — later calls are fast and work offline.`,
          },
          {
            type: "quiz",
            question: `What does load_dataset("imdb") return?`,
            options: [
              `A single Python list`,
              `A DatasetDict with splits like train/test`,
              `A trained model`,
              `A CSV file path only`,
            ],
            answer: 1,
            explanation:
              `Most Hub datasets ship with named splits, bundled together in a DatasetDict.`,
          },
          {
            type: "quiz",
            question: `What are the key advantages of using the datasets library's load_dataset() over manually downloading and parsing CSV files?`,
            options: [
              `It only works for small datasets under 1GB`,
              `It loads the entire dataset into RAM at once`,
              `Datasets are pre-cleaned, pre-split into train/test, cached locally after first download, and memory-mapped from disk`,
              `Manual CSV parsing is faster than using load_dataset()`,
            ],
            answer: 2,
            explanation:
              `load_dataset() eliminates the parsing chore: datasets come pre-validated and pre-split, they're cached locally after first download so subsequent calls are fast, and they use memory-mapping so you can work with datasets larger than your RAM without slowdown.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load IMDB`,
          description:
            `Import \`load_dataset\` from \`datasets\`, load \`"imdb"\`, and print \`dataset["train"][0]\`.`,
          starterCode: `from datasets import load_dataset

`,
          solutionCode: `from datasets import load_dataset

dataset = load_dataset("imdb")
print(dataset["train"][0])`,
          tests: [
            {
              id: 1,
              label: `Imports load_dataset`,
              keywords: [{ pattern: `from\\s+datasets\\s+import\\s+load_dataset` }],
            },
            {
              id: 2,
              label: `Loads imdb`,
              keywords: [{ pattern: `load_dataset\\s*\\(\\s*["']imdb["']\\s*\\)` }],
            },
            {
              id: 3,
              label: `Prints a train example`,
              keywords: [{ pattern: `dataset\\[["']train["']\\]\\[0\\]` }],
            },
          ],
        },
      },
      {
        id: "hf-9",
        title: `Inspecting & slicing a Dataset`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `A \`Dataset\` behaves like a smart, read-only list: indexing it (\`dataset[0]\`) or slicing it (\`dataset[:5]\`) returns plain Python dicts, and every operation you call — \`.shuffle()\`, \`.select()\`, \`.filter()\` — returns a **new** \`Dataset\` rather than modifying the original in place, so you never have to worry about accidentally mutating your data mid-experiment. Check **\`.features\`** first to see the schema: column names, their types, and — for label columns — the actual class names behind numbers like \`0\` and \`1\` (a \`ClassLabel\` feature knows that \`0\` means "negative" and \`1\` means "positive"). Chaining **\`.shuffle(seed=...)\`** and **\`.select(range(n))\`** is the fastest way to grab a small, reproducible sample before committing to a slow full run.`,
          },
          {
            type: "scenario",
            title: `Quick sanity check before a long training run`,
            content:
              `Before tokenizing 25,000 reviews, pull a shuffled sample of 5 to eyeball the text and labels — catching a formatting problem early saves a lot of wasted compute.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Inspect and sample`,
            content: `from datasets import load_dataset

dataset = load_dataset("imdb")
print(dataset["train"].features)

small = dataset["train"].shuffle(seed=42).select(range(5))
print(small["label"])`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Set a fixed \`seed\` when shuffling so your sample is reproducible between runs.`,
          },
          {
            type: "quiz",
            question: `What does dataset["train"].features tell you?`,
            options: [
              `The trained model's accuracy`,
              `The column names and their data types`,
              `The number of GPUs available`,
              `The tokenizer's vocabulary`,
            ],
            answer: 1,
            explanation:
              `.features describes the schema — column names, types (like ClassLabel), and possible label names.`,
          },
          {
            type: "quiz",
            question: `Why is checking dataset.features important before tokenizing or training?`,
            options: [
              `Features only show the file size`,
              `Features describe the column names, data types, and label class names — essential to understand your data structure before processing`,
              `Features are only needed if using GPU`,
              `You should never look at features before training`,
            ],
            answer: 1,
            explanation:
              `.features tells you the schema: column names, their types (like ClassLabel for labels), and crucially for classification, the actual class name behind each numeric label (e.g., 0='negative', 1='positive') — this prevents label confusion and helps you write correct preprocessing functions.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Sample the Dataset`,
          description:
            `Print \`dataset["train"].features\`. Then create \`small = dataset["train"].shuffle(seed=42).select(range(5))\` and print \`small["label"]\`.`,
          starterCode: `from datasets import load_dataset

dataset = load_dataset("imdb")

`,
          solutionCode: `from datasets import load_dataset

dataset = load_dataset("imdb")
print(dataset["train"].features)

small = dataset["train"].shuffle(seed=42).select(range(5))
print(small["label"])`,
          tests: [
            {
              id: 1,
              label: `Shuffles with a seed`,
              keywords: [{ pattern: `\\.shuffle\\s*\\(\\s*seed\\s*=` }],
            },
            {
              id: 2,
              label: `Selects a range`,
              keywords: [{ pattern: `\\.select\\s*\\(\\s*range\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-10",
        title: `map(), filter(), and preprocessing`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `**\`.map(fn, batched=True)\`** runs a function over the whole dataset in one pass — the standard way to tokenize every row before training. With \`batched=True\`, your function receives a dict of *lists* (a chunk of rows at once) instead of one example at a time, which lets the tokenizer batch its own work internally and run dramatically faster. **\`.filter(fn)\`** keeps only the rows where \`fn\` returns \`True\`, useful for dropping malformed or overly long examples before they ever reach training. One detail worth knowing: \`.map()\` results are cached to disk automatically, so re-running the same preprocessing script a second time reuses the cached version instead of redoing the work.`,
          },
          {
            type: "scenario",
            title: `Tokenizing 25,000 reviews at once`,
            content:
              `Writing a manual loop over every review is slow and easy to get wrong. \`.map()\` applies your tokenizer function in batches and can use multiple processes automatically.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Tokenize and filter`,
            content: `from datasets import load_dataset
from transformers import AutoTokenizer

dataset = load_dataset("imdb")
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

def tokenize_fn(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

tokenized = dataset.map(tokenize_fn, batched=True)
short_only = tokenized.filter(lambda ex: len(ex["input_ids"]) < 256)
print(short_only)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Use \`remove_columns=[...]\` on \`.map()\` to drop raw text columns the model does not need — keeping only tensors speeds up training.`,
          },
          {
            type: "quiz",
            question: `What does batched=True do in .map()?`,
            options: [
              `Processes the dataset one row at a time`,
              `Passes chunks of rows to your function at once, for speed`,
              `Deletes the dataset`,
              `Trains the model`,
            ],
            answer: 1,
            explanation:
              `batched=True hands your function a dict of lists (a batch) instead of one example, which is much faster for tokenization.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Tokenize the Whole Dataset`,
          description:
            `Define \`tokenize_fn(batch)\` that returns \`tokenizer(batch["text"], padding=True, truncation=True)\`. Apply it with \`dataset.map(tokenize_fn, batched=True)\`.`,
          starterCode: `from datasets import load_dataset
from transformers import AutoTokenizer

dataset = load_dataset("imdb")
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

`,
          solutionCode: `from datasets import load_dataset
from transformers import AutoTokenizer

dataset = load_dataset("imdb")
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

def tokenize_fn(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

tokenized = dataset.map(tokenize_fn, batched=True)
print(tokenized)`,
          tests: [
            {
              id: 1,
              label: `Defines tokenize_fn`,
              keywords: [{ pattern: `def\\s+tokenize_fn\\s*\\(` }],
            },
            {
              id: 2,
              label: `Calls .map with batched=True`,
              keywords: [{ pattern: `\\.map\\s*\\(\\s*tokenize_fn\\s*,\\s*batched\\s*=\\s*True\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "hub",
    title: `Model Hub`,
    icon: "🌐",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-11",
        title: `Finding models & model cards`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `The **Hub** (huggingface.co/models) lets you filter by task, library, language, and license, and sort by downloads or recent updates — useful signals for which models are actually maintained and trusted. Picking a model is rarely just "find one that does the task": it's a tradeoff between size (a smaller model is cheaper and faster to run but usually less accurate), how closely its training data matches your domain, and whether its license permits what you want to do with it. Every model ships with a **model card** — documentation covering intended use, known limitations, training data, and license — which is the fastest way to make that tradeoff without downloading and testing five different checkpoints yourself.`,
          },
          {
            type: "scenario",
            title: `Choosing the right checkpoint`,
            content:
              `Two models both do sentiment analysis — one is tiny and fast, one is large and more accurate. The model card's "intended use" and benchmark numbers help you pick the right tradeoff for your app.`,
          },
          {
            type: "table",
            title: `What a model card tells you`,
            columns: [`Section`, `Why it matters`],
            rows: [
              { label: `Intended use`, values: [`Intended use`, `Is this model meant for your task?`] },
              { label: `Limitations`, values: [`Limitations`, `Known biases or failure cases`] },
              { label: `Training data`, values: [`Training data`, `What the model has and has not seen`] },
              { label: `License`, values: [`License`, `Whether you can use it commercially`] },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Always check the license section before shipping a model in a commercial product — not every model allows commercial use.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Search the Hub from code`,
            content: `from huggingface_hub import HfApi

api = HfApi()
models = api.list_models(task="text-classification", limit=5)
for m in models:
    print(m.id)`,
          },
          {
            type: "quiz",
            question: `Why check a model's license before using it?`,
            options: [
              `Licenses affect model accuracy`,
              `Some licenses restrict commercial or redistribution use`,
              `It changes the model's file size`,
              `It is required to load the model at all`,
            ],
            answer: 1,
            explanation:
              `A model file can load regardless of license — but using it against the license terms is a legal risk, so always check first.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `List Text Classification Models`,
          description:
            `Import \`HfApi\` from \`huggingface_hub\`. Create \`api = HfApi()\`, list models with \`task="text-classification"\` and \`limit=5\`, and print each model's \`.id\`.`,
          starterCode: `from huggingface_hub import HfApi

`,
          solutionCode: `from huggingface_hub import HfApi

api = HfApi()
models = api.list_models(task="text-classification", limit=5)
for m in models:
    print(m.id)`,
          tests: [
            {
              id: 1,
              label: `Creates HfApi`,
              keywords: [{ pattern: `HfApi\\s*\\(` }],
            },
            {
              id: 2,
              label: `Calls list_models`,
              keywords: [{ pattern: `\\.list_models\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-12",
        title: `from_pretrained() and caching`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `**Any** public repo id works with \`from_pretrained()\` — official organizations, universities, and individual users are all loaded the exact same way, because every Hub repo is really just a git repository with a standard set of files (\`config.json\`, tokenizer files, and weights, usually in the \`safetensors\` format). Downloaded files are cached under \`~/.cache/huggingface\`, keyed by repo name and commit hash, so loading the same model twice never re-downloads it. Because a repo can be updated after you first download it, pass **\`revision=\`** to pin an exact commit, tag, or branch — the same idea as pinning a dependency version — so an experiment you run today still loads the identical weights if you rerun it in six months.`,
          },
          {
            type: "scenario",
            title: `Reproducible experiments`,
            content:
              `A model's weights on the Hub can change over time. Pinning \`revision="v1.0"\` guarantees your experiment loads exactly the same weights months later.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Pin a revision`,
            content: `from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased-finetuned-sst-2-english",
    revision="main",
)
print(model.name_or_path)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Set the \`HF_HOME\` environment variable to change where models are cached — handy on machines with limited home-directory space.`,
          },
          {
            type: "quiz",
            question: `What does the revision argument control?`,
            options: [
              `The programming language used`,
              `Which exact commit, branch, or tag of a repo gets loaded`,
              `The batch size during inference`,
              `Whether the model trains further`,
            ],
            answer: 1,
            explanation:
              `revision pins from_pretrained() to a specific point in the repo's history, just like a git ref.`,
          },
          {
            type: "quiz",
            question: `Why is it important to pin a specific revision when downloading a model for production?`,
            options: [
              `It makes the download faster`,
              `A model's weights on the Hub can be updated over time; pinning revision ensures your experiment loads the exact same weights months later`,
              `It reduces the file size`,
              `Revision pinning only works with private models`,
            ],
            answer: 1,
            explanation:
              `Model repositories can be updated after initial download, so pinning revision="v1.0" guarantees reproducibility — the same weights will load in the future, not a newer or different version.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load a Pinned Revision`,
          description:
            `Load \`AutoModelForSequenceClassification\` from \`"distilbert-base-uncased-finetuned-sst-2-english"\` with \`revision="main"\`, then print \`model.name_or_path\`.`,
          starterCode: `from transformers import AutoModelForSequenceClassification

`,
          solutionCode: `from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased-finetuned-sst-2-english",
    revision="main",
)
print(model.name_or_path)`,
          tests: [
            {
              id: 1,
              label: `Passes a revision`,
              keywords: [{ pattern: `revision\\s*=\\s*["']main["']` }],
            },
            {
              id: 2,
              label: `Prints name_or_path`,
              keywords: [{ pattern: `print\\s*\\(\\s*model\\.name_or_path\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "hf-13",
        title: `push_to_hub() & login`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `Log in once with **\`huggingface_hub.login(token=...)\`**, then call **\`model.push_to_hub(repo_id)\`** and **\`tokenizer.push_to_hub(repo_id)\`** to publish your own model. Under the hood this creates a git repository on the Hub (using Git LFS for the large weight files), uploads everything, and even generates a starter model card for you — the same kind of repo you explored in the last two lessons. From that point on, your model is a first-class citizen of the ecosystem: anyone with access can load it back with the exact same \`from_pretrained()\` call used for official models, whether that's a teammate, a CI pipeline, or you on a different machine.`,
          },
          {
            type: "scenario",
            title: `Sharing a fine-tuned model with your team`,
            content:
              `You fine-tuned a classifier locally. Instead of emailing a zip file, \`push_to_hub("your-org/ticket-classifier")\` gives teammates a \`from_pretrained()\`-ready repo in seconds.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Publish a model`,
            content: `from huggingface_hub import login

login(token="hf_your_token_here")

model.push_to_hub("your-username/my-sentiment-model")
tokenizer.push_to_hub("your-username/my-sentiment-model")`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Never hardcode a real token in shared code. Use an environment variable or \`huggingface-cli login\` from a terminal instead.`,
          },
          {
            type: "quiz",
            question: `What does push_to_hub() upload?`,
            options: [
              `Only the training data`,
              `Model weights and config (and tokenizer files, when called on the tokenizer)`,
              `Your entire local filesystem`,
              `Nothing until you also call save_pretrained()`,
            ],
            answer: 1,
            explanation:
              `push_to_hub() uploads the weights/config for a model, or the vocab/config files for a tokenizer, to a Hub repo.`,
          },
          {
            type: "quiz",
            question: `What is the primary purpose of logging in with huggingface_hub.login() before calling push_to_hub()?`,
            options: [
              `It encrypts your model file on disk`,
              `It verifies your identity and grants permission to upload repositories to the Hub on your behalf`,
              `It automatically creates a model card for you`,
              `It increases your model's download speed`,
            ],
            answer: 1,
            explanation:
              `login() authenticates your identity using a token, allowing push_to_hub() to create and upload repositories under your account without requiring you to hardcode credentials in your shared code.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Publish to the Hub`,
          description:
            `Import \`login\` from \`huggingface_hub\`, log in with a token, then call \`push_to_hub\` on both \`model\` and \`tokenizer\` for \`"your-username/my-sentiment-model"\`.`,
          starterCode: `from huggingface_hub import login

`,
          solutionCode: `from huggingface_hub import login

login(token="hf_your_token_here")

model.push_to_hub("your-username/my-sentiment-model")
tokenizer.push_to_hub("your-username/my-sentiment-model")`,
          tests: [
            {
              id: 1,
              label: `Logs in`,
              keywords: [{ pattern: `login\\s*\\(\\s*token\\s*=` }],
            },
            {
              id: 2,
              label: `Pushes the model`,
              keywords: [{ pattern: `model\\.push_to_hub\\s*\\(` }],
            },
            {
              id: 3,
              label: `Pushes the tokenizer`,
              keywords: [{ pattern: `tokenizer\\.push_to_hub\\s*\\(` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "finetuning",
    title: `Fine-tuning Pretrained Models`,
    icon: "🏋️",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-14",
        title: `TrainingArguments & Trainer`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `**\`TrainingArguments\`** configures a training run — output folder, epochs, batch size, learning rate, how often to evaluate and save checkpoints, whether to use mixed precision, and dozens of other options you can leave at their defaults until you need them. **\`Trainer\`** wires together the model, those arguments, and your datasets, and then runs the entire training loop for you: forward pass, loss, backward pass, optimizer step, logging, checkpointing, evaluation. That's a meaningful amount of code it saves you from writing by hand — and it also transparently handles things like multi-GPU training and gradient accumulation that would otherwise require significant extra effort to get right.`,
          },
          {
            type: "scenario",
            title: `Skipping the manual training loop`,
            content:
              `Instead of writing forward/backward/step by hand like in raw PyTorch, \`Trainer\` gives you logging, checkpointing, and evaluation out of the box.`,
          },
          {
            type: "diagram",
            title: `Trainer setup`,
            nodes: [
              {
                id: "args",
                label: `TrainingArguments`,
                color: "#FF9D00",
                items: [`epochs, batch size, lr`],
              },
              {
                id: "trainer",
                label: `Trainer`,
                color: "#FFB84D",
                items: [`model + args + data`],
              },
              {
                id: "run",
                label: `.train()`,
                color: "#FFD180",
                items: [`Logs loss`, `Saves checkpoints`],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Start with a small \`num_train_epochs\` (1–3) and a small dataset slice while you debug your setup — full runs can take hours.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Minimal Trainer setup`,
            content: `from transformers import TrainingArguments, Trainer

args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8,
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
)
trainer.train()`,
          },
          {
            type: "quiz",
            question: `What does TrainingArguments control?`,
            options: [
              `The dataset's column names`,
              `Training hyperparameters like epochs, batch size, and output folder`,
              `The model's vocabulary`,
              `Which GPU brand is installed`,
            ],
            answer: 1,
            explanation:
              `TrainingArguments is a config object for the training run — hyperparameters and logging/saving behavior.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Set Up a Trainer`,
          description:
            `Create \`TrainingArguments(output_dir="./results", num_train_epochs=3, per_device_train_batch_size=8)\`, wire up a \`Trainer\` with \`model\`, \`args\`, and \`train_dataset=tokenized["train"]\`, then call \`trainer.train()\`.`,
          starterCode: `from transformers import TrainingArguments, Trainer

`,
          solutionCode: `from transformers import TrainingArguments, Trainer

args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8,
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
)
trainer.train()`,
          tests: [
            {
              id: 1,
              label: `Creates TrainingArguments`,
              keywords: [{ pattern: `TrainingArguments\\s*\\(` }],
            },
            {
              id: 2,
              label: `Creates a Trainer`,
              keywords: [{ pattern: `Trainer\\s*\\(` }],
            },
            {
              id: 3,
              label: `Calls trainer.train()`,
              keywords: [{ pattern: `trainer\\.train\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-15",
        title: `Metrics with evaluate`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `Loss going down tells you the model is fitting *something*, but not whether that something is useful — and on an imbalanced dataset (say, 95% negative reviews), a model that always predicts "negative" gets 95% accuracy while being completely useless. This is why real fine-tuning tracks task metrics, not just loss. The **\`evaluate\`** library loads standard metrics with **\`evaluate.load(name)\`** — accuracy, F1, precision/recall, and many task-specific metrics — with a consistent \`.compute(predictions=..., references=...)\` interface. Writing a **\`compute_metrics\`** function and passing it to \`Trainer\` means those numbers get computed and logged automatically every time the model is evaluated, so you can watch real task performance evolve across training instead of just a loss curve.`,
          },
          {
            type: "scenario",
            title: `Knowing if fine-tuning actually helped`,
            content:
              `Loss going down is not the whole story — a \`compute_metrics\` function reporting accuracy on a held-out validation set tells you whether the model is actually getting better at the task.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Accuracy metric`,
            content: `import evaluate
import numpy as np

metric = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return metric.compute(predictions=preds, references=labels)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Pass \`compute_metrics=compute_metrics\` to \`Trainer\` and give it an \`eval_dataset\` — results are printed after each evaluation step.`,
          },
          {
            type: "quiz",
            question: `What does compute_metrics receive as input?`,
            options: [
              `The raw text of every example`,
              `A tuple of (logits, labels) from evaluation`,
              `The model's file path`,
              `Nothing — it takes no arguments`,
            ],
            answer: 1,
            explanation:
              `Trainer calls compute_metrics with an EvalPrediction containing predictions (logits) and label_ids.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Compute Accuracy`,
          description:
            `Load \`evaluate.load("accuracy")\` as \`metric\`. Define \`compute_metrics(eval_pred)\` that unpacks logits and labels, takes \`np.argmax\`, and returns \`metric.compute(predictions=preds, references=labels)\`.`,
          starterCode: `import evaluate
import numpy as np

`,
          solutionCode: `import evaluate
import numpy as np

metric = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return metric.compute(predictions=preds, references=labels)`,
          tests: [
            {
              id: 1,
              label: `Loads an evaluate metric`,
              keywords: [{ pattern: `evaluate\\.load\\s*\\(` }],
            },
            {
              id: 2,
              label: `Defines compute_metrics`,
              keywords: [{ pattern: `def\\s+compute_metrics\\s*\\(` }],
            },
            {
              id: 3,
              label: `Uses argmax on logits`,
              keywords: [{ pattern: `np\\.argmax\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-16",
        title: `Fine-tuning a text classifier end-to-end`,
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              `Fine-tuning combines everything so far: a **tokenized dataset**, a **model** already pretrained on huge amounts of general text, **\`TrainingArguments\`**, and a **\`Trainer\`** with **\`compute_metrics\`**. What actually happens during \`.train()\` is a *nudge*, not a rebuild — the model already knows grammar, vocabulary, and general language patterns from pretraining, and fine-tuning just adjusts those weights slightly toward your specific data and labels. That's why fine-tuning typically needs far less data and far fewer epochs than training from scratch, and why learning rates are kept small — a large learning rate risks "catastrophic forgetting," where the model overwrites its general knowledge instead of specializing it. Once training finishes, \`.save_pretrained()\` writes the adjusted weights to disk so the result outlives the Python process that created it.`,
          },
          {
            type: "scenario",
            title: `Specializing a general model`,
            content:
              `A general sentiment model might not know your app's slang. Fine-tuning on a few thousand labeled examples from your own domain nudges the pretrained weights toward your specific data.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Full fine-tuning run`,
            content: `from datasets import load_dataset
from transformers import Trainer

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["test"],
    compute_metrics=compute_metrics,
)
trainer.train()
model.save_pretrained("./fine-tuned-model")
tokenizer.save_pretrained("./fine-tuned-model")`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `Reload later with \`AutoModelForSequenceClassification.from_pretrained("./fine-tuned-model")\` — it works exactly like a Hub model.`,
          },
          {
            type: "quiz",
            question: `After trainer.train() finishes, how do you keep the fine-tuned weights?`,
            options: [
              `They save automatically to the Hub`,
              `Call model.save_pretrained(path)`,
              `Restart the Python process`,
              `Weights cannot be saved locally`,
            ],
            answer: 1,
            explanation:
              `save_pretrained() writes the model config and weights to a local folder you choose.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Train, Evaluate, Save`,
          description:
            `Build a \`Trainer\` with \`train_dataset\`, \`eval_dataset\`, and \`compute_metrics\`. Call \`trainer.train()\`, then \`model.save_pretrained("./fine-tuned-model")\`.`,
          starterCode: `from datasets import load_dataset
from transformers import Trainer

`,
          solutionCode: `from datasets import load_dataset
from transformers import Trainer

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["test"],
    compute_metrics=compute_metrics,
)
trainer.train()
model.save_pretrained("./fine-tuned-model")
tokenizer.save_pretrained("./fine-tuned-model")`,
          tests: [
            {
              id: 1,
              label: `Passes eval_dataset`,
              keywords: [{ pattern: `eval_dataset\\s*=` }],
            },
            {
              id: 2,
              label: `Passes compute_metrics`,
              keywords: [{ pattern: `compute_metrics\\s*=\\s*compute_metrics` }],
            },
            {
              id: 3,
              label: `Saves the model`,
              keywords: [{ pattern: `model\\.save_pretrained\\s*\\(` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "peft",
    title: `PEFT & LoRA`,
    icon: "🧬",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-17",
        title: `Why parameter-efficient fine-tuning?`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `Full fine-tuning updates **every** parameter in a model, and training needs far more memory than just storing the weights: the Adam optimizer commonly used for training keeps two extra numbers *per parameter* to track momentum, and gradients need to be stored too — roughly 4x a model's raw weight memory just to train it, before activations are even counted. For a 7-billion-parameter model, that can mean well over 100GB of GPU memory for full fine-tuning — far beyond what a single consumer or even most single-server GPUs offer. **PEFT** (Parameter-Efficient Fine-Tuning) sidesteps this entirely: freeze the base model completely (no gradients, no optimizer state needed for it) and train only a small number of new parameters bolted on top. This isn't just cheaper — for many teams it's the difference between fine-tuning being possible at all or not.`,
          },
          {
            type: "scenario",
            title: `One base model, many tasks`,
            content:
              `A company fine-tunes the same base model for 10 different clients. Full fine-tuning means storing 10 full copies of the model. PEFT means storing 1 base model plus 10 tiny adapter files.`,
          },
          {
            type: "table",
            title: `Full fine-tuning vs. LoRA`,
            columns: [`Aspect`, `Full fine-tuning`, `LoRA (PEFT)`],
            rows: [
              { label: `Trainable params`, values: [`Trainable params`, `100%`, `Often < 1%`] },
              { label: `Memory to train`, values: [`Memory to train`, `High`, `Much lower`] },
              { label: `Saved file size`, values: [`Saved file size`, `Full model`, `A few MB adapter`] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              `LoRA is one PEFT method among several (others include prefix tuning and adapters) — it is the most widely used today because it is simple and effective.`,
          },
          {
            type: "code",
            lang: "python",
            label: `How big is "full"?`,
            content: `from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
total = sum(p.numel() for p in model.parameters())
print(f"{total:,} total parameters")`,
          },
          {
            type: "quiz",
            question: `What is the core idea behind PEFT methods like LoRA?`,
            options: [
              `Train a completely new model from scratch`,
              `Freeze the pretrained weights and train a small number of extra parameters`,
              `Delete most of the model's layers`,
              `Only change the tokenizer, never the model`,
            ],
            answer: 1,
            explanation:
              `PEFT keeps the base model frozen and adds small trainable pieces, cutting memory and storage costs sharply.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Count the Parameters`,
          description:
            `Load \`AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")\` and print the total parameter count using \`sum(p.numel() for p in model.parameters())\`.`,
          starterCode: `from transformers import AutoModelForSequenceClassification

`,
          solutionCode: `from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
total = sum(p.numel() for p in model.parameters())
print(total)`,
          tests: [
            {
              id: 1,
              label: `Sums parameter counts`,
              keywords: [{ pattern: `\\.numel\\s*\\(\\s*\\)` }],
            },
            {
              id: 2,
              label: `Prints the total`,
              keywords: [{ pattern: `print\\s*\\(\\s*total\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "hf-18",
        title: `LoraConfig and get_peft_model`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `LoRA's actual trick: instead of directly updating a big weight matrix \`W\` during fine-tuning, freeze \`W\` entirely and learn a separate *update* \`ΔW\`, expressed as the product of two small matrices, \`ΔW = B × A\`. If \`W\` is 768×768 (roughly 590,000 numbers), a rank-8 LoRA update needs only two 768×8 matrices — about 12,000 numbers combined, less than 2% of the original. The model's output effectively becomes \`W·x + B·A·x\`, so the frozen pretrained knowledge in \`W\` stays fully intact while \`B\` and \`A\` learn the task-specific adjustment. The **\`peft\`** library implements this: **\`LoraConfig\`** sets the adapter's **rank (\`r\`)** — how "wide" that update is allowed to be — its scaling (**\`lora_alpha\`**), and \`target_modules\`, which layers get an adapter attached. **\`get_peft_model()\`** then freezes the base model and inserts trainable LoRA matrices at exactly those layers.`,
          },
          {
            type: "scenario",
            title: `Picking a rank`,
            content:
              `A low rank (\`r=4\` or \`r=8\`) trains very few extra parameters and is fast to experiment with; a higher rank gives the adapter more capacity at the cost of a few more trainable parameters.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Wrap a model with LoRA`,
            content: `from peft import LoraConfig, get_peft_model, TaskType

config = LoraConfig(
    task_type=TaskType.SEQ_CLS,
    r=8,
    lora_alpha=16,
    lora_dropout=0.1,
    target_modules=["q_lin", "v_lin"],
)

peft_model = get_peft_model(model, config)
peft_model.print_trainable_parameters()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `\`print_trainable_parameters()\` usually shows well under 1% of parameters as trainable — that is the whole point of LoRA.`,
          },
          {
            type: "quiz",
            question: `What does target_modules specify in LoraConfig?`,
            options: [
              `Which dataset columns to use`,
              `Which layers of the base model get LoRA adapters attached`,
              `The learning rate schedule`,
              `The tokenizer's vocabulary size`,
            ],
            answer: 1,
            explanation:
              `target_modules names the linear layers (like attention query/value projections) that receive LoRA's low-rank update.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Build a LoRA Adapter`,
          description:
            `Create a \`LoraConfig\` with \`task_type=TaskType.SEQ_CLS\`, \`r=8\`, \`lora_alpha=16\`. Wrap \`model\` with \`get_peft_model()\` and call \`print_trainable_parameters()\`.`,
          starterCode: `from peft import LoraConfig, get_peft_model, TaskType

`,
          solutionCode: `from peft import LoraConfig, get_peft_model, TaskType

config = LoraConfig(
    task_type=TaskType.SEQ_CLS,
    r=8,
    lora_alpha=16,
    lora_dropout=0.1,
    target_modules=["q_lin", "v_lin"],
)

peft_model = get_peft_model(model, config)
peft_model.print_trainable_parameters()`,
          tests: [
            {
              id: 1,
              label: `Creates a LoraConfig`,
              keywords: [{ pattern: `LoraConfig\\s*\\(` }],
            },
            {
              id: 2,
              label: `Wraps the model with get_peft_model`,
              keywords: [{ pattern: `get_peft_model\\s*\\(\\s*model` }],
            },
            {
              id: 3,
              label: `Prints trainable parameters`,
              keywords: [{ pattern: `print_trainable_parameters\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-19",
        title: `Training and saving a LoRA adapter`,
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              `Because \`get_peft_model()\` just adds trainable matrices to a frozen model, everything else about training stays the same — a LoRA-wrapped model trains with the **same \`Trainer\` workflow**, the same \`TrainingArguments\`, the same \`compute_metrics\` as a fully fine-tuned one. The payoff shows up at save time: since the base weights never changed, **\`save_pretrained()\`** on a PEFT model only needs to write out the small \`B\`/\`A\` adapter matrices, not the whole model. To use it later, reload the original frozen base model, then attach the adapter with **\`PeftModel.from_pretrained(base_model, adapter_path)\`** — and for deployment, \`merge_and_unload()\` can fold the adapter's math directly into the base weights, producing a single model with zero extra inference cost from having used LoRA at all.`,
          },
          {
            type: "scenario",
            title: `Shipping a few-MB adapter instead of a full model`,
            content:
              `A fine-tuned adapter for a 250M-parameter base model might be only a few megabytes — small enough to email, version in git, or bundle several per app.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Train, save, and reload`,
            content: `trainer = Trainer(model=peft_model, args=args, train_dataset=tokenized["train"])
trainer.train()
peft_model.save_pretrained("./lora-adapter")

from peft import PeftModel

base = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
loaded = PeftModel.from_pretrained(base, "./lora-adapter")`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `Because the base model is frozen, you can swap different adapters onto the same base model at inference time without reloading everything.`,
          },
          {
            type: "quiz",
            question: `What does peft_model.save_pretrained() write to disk?`,
            options: [
              `The entire base model's weights`,
              `Only the small LoRA adapter weights`,
              `Nothing — PEFT models cannot be saved`,
              `The training dataset`,
            ],
            answer: 1,
            explanation:
              `Since the base weights are frozen and unchanged, only the trained adapter parameters need to be saved.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Save and Reload an Adapter`,
          description:
            `Train \`peft_model\` with a \`Trainer\`, save it with \`peft_model.save_pretrained("./lora-adapter")\`, then reload with \`PeftModel.from_pretrained(base, "./lora-adapter")\`.`,
          starterCode: `from peft import PeftModel

`,
          solutionCode: `trainer = Trainer(model=peft_model, args=args, train_dataset=tokenized["train"])
trainer.train()
peft_model.save_pretrained("./lora-adapter")

from peft import PeftModel

base = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
loaded = PeftModel.from_pretrained(base, "./lora-adapter")`,
          tests: [
            {
              id: 1,
              label: `Saves the adapter`,
              keywords: [{ pattern: `peft_model\\.save_pretrained\\s*\\(` }],
            },
            {
              id: 2,
              label: `Reloads with PeftModel`,
              keywords: [{ pattern: `PeftModel\\.from_pretrained\\s*\\(` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "quantization",
    title: `Quantization`,
    icon: "🗜️",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-20",
        title: `Why quantize?`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `**Quantization** stores model weights in fewer bits — trading some numeric precision for a much smaller memory footprint and faster inference. Common formats: **float32** (default, 4 bytes per weight), **float16/bfloat16** (2 bytes), **int8** (1 byte), and **int4** (half a byte). This matters at two very different moments: during **training**, where PEFT is usually the bigger lever, and during **deployment**, where quantization is often the deciding factor — if you're serving a model to thousands of users, halving or quartering its memory footprint can mean fitting on cheaper hardware, running more replicas per GPU, or enabling on-device use entirely. The precision lost is usually smaller than it sounds, because model weights tend to cluster in a narrow range where fewer bits still distinguish values well enough for the model to behave almost identically.`,
          },
          {
            type: "scenario",
            title: `Fitting a big model on one GPU`,
            content:
              `A model that needs 28 GB in float32 might fit in about 7 GB at int8 — the difference between "does not fit" and "fits comfortably" on a single consumer GPU.`,
          },
          {
            type: "table",
            title: `Precision vs. rough memory per parameter`,
            columns: [`Format`, `Bytes / param`, `~Size for 7B params`],
            rows: [
              { label: `float32`, values: [`float32`, `4`, `~28 GB`] },
              { label: `float16 / bfloat16`, values: [`float16 / bfloat16`, `2`, `~14 GB`] },
              { label: `int8`, values: [`int8`, `1`, `~7 GB`] },
              { label: `int4`, values: [`int4`, `0.5`, `~3.5 GB`] },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Lower precision can slightly reduce accuracy — always evaluate a quantized model on your task before shipping it.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Halve memory with float16`,
            content: `from transformers import AutoModelForSequenceClassification
import torch

model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
model = model.half()
print(next(model.parameters()).dtype)`,
          },
          {
            type: "quiz",
            question: `What is the main tradeoff quantization makes?`,
            options: [
              `Training speed for dataset size`,
              `Numeric precision for lower memory use and faster inference`,
              `Accuracy for a larger vocabulary`,
              `License terms for open weights`,
            ],
            answer: 1,
            explanation:
              `Quantization reduces the number of bits per weight, shrinking memory and often speeding up inference, at some risk to accuracy.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Cast to Half Precision`,
          description:
            `Call \`model = model.half()\` and print \`next(model.parameters()).dtype\`.`,
          starterCode: `from transformers import AutoModelForSequenceClassification
import torch

model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")

`,
          solutionCode: `from transformers import AutoModelForSequenceClassification
import torch

model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
model = model.half()
print(next(model.parameters()).dtype)`,
          tests: [
            {
              id: 1,
              label: `Casts model to half precision`,
              keywords: [{ pattern: `model\\.half\\s*\\(\\s*\\)` }],
            },
            {
              id: 2,
              label: `Prints the resulting dtype`,
              keywords: [{ pattern: `print\\s*\\(\\s*next\\s*\\(\\s*model\\.parameters\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-21",
        title: `8-bit & 4-bit loading with bitsandbytes`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `Unlike PEFT, which changes how you *train*, this kind of quantization is usually applied for **inference** on an already-trained model — no retraining needed, which is why it's often called "post-training quantization." With the **\`bitsandbytes\`** library installed, pass **\`load_in_8bit=True\`** or **\`load_in_4bit=True\`** to \`from_pretrained()\` and the weights are converted to lower precision as they load, before a single token is ever processed. Internally, 8-bit loading uses a mixed-precision trick that keeps a small number of statistically important "outlier" weights in higher precision so accuracy barely moves, while everything else compresses down. This does require a CUDA GPU, since the speed benefit comes from specialized low-precision kernels that only exist for NVIDIA hardware.`,
          },
          {
            type: "scenario",
            title: `Running a large model on a single GPU`,
            content:
              `A model too big to fit in float16 on your GPU might load comfortably in 8-bit or 4-bit — enabling experimentation on hardware you already have.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Load in 8-bit`,
            content: `from transformers import AutoModelForCausalLM

model_8bit = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    load_in_8bit=True,
    device_map="auto",
)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `\`device_map="auto"\` lets the library decide how to split the model across available GPUs (and CPU/disk if needed).`,
          },
          {
            type: "quiz",
            question: `What is required to use load_in_8bit=True?`,
            options: [
              `Nothing extra — it works on any CPU`,
              `The bitsandbytes library and a CUDA GPU`,
              `A paid Hugging Face subscription`,
              `Converting the dataset to 8-bit first`,
            ],
            answer: 1,
            explanation:
              `8-bit and 4-bit loading rely on CUDA kernels from bitsandbytes, so they need an NVIDIA GPU.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load GPT-2 in 8-bit`,
          description:
            `Load \`AutoModelForCausalLM.from_pretrained("gpt2", load_in_8bit=True, device_map="auto")\`.`,
          starterCode: `from transformers import AutoModelForCausalLM

`,
          solutionCode: `from transformers import AutoModelForCausalLM

model_8bit = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    load_in_8bit=True,
    device_map="auto",
)`,
          tests: [
            {
              id: 1,
              label: `Uses load_in_8bit=True`,
              keywords: [{ pattern: `load_in_8bit\\s*=\\s*True` }],
            },
            {
              id: 2,
              label: `Sets device_map="auto"`,
              keywords: [{ pattern: `device_map\\s*=\\s*["']auto["']` }],
            },
          ],
        },
      },
      {
        id: "hf-22",
        title: `BitsAndBytesConfig & QLoRA`,
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              `**\`BitsAndBytesConfig\`** gives fine control over 4-bit loading — **\`nf4\`** ("NormalFloat4") is a quant type specifically designed around the fact that pretrained weights tend to follow a roughly bell-curve distribution, so it allocates its limited 16 possible values more precisely than a plain linear 4-bit scale would; **\`bnb_4bit_use_double_quant\`** squeezes out a little more memory by quantizing the quantization constants themselves. The real breakthrough is combining this with what you learned last chapter: keep the base model frozen in 4-bit, and train only a LoRA adapter in higher precision on top of it. Gradients still flow backward through the frozen 4-bit weights into the adapter during training, even though those base weights themselves never update — that's the trick that makes it work at all. This combination is called **QLoRA**, and it's the reason fine-tuning a 7B–70B parameter model on a single consumer or workstation GPU went from "impossible" to routine.`,
          },
          {
            type: "scenario",
            title: `Fine-tuning a 7B model on a single consumer GPU`,
            content:
              `QLoRA made headlines by fine-tuning models that previously needed multiple data-center GPUs on a single 24 GB card — the base model stays 4-bit and frozen; only a small LoRA adapter trains in higher precision.`,
          },
          {
            type: "code",
            lang: "python",
            label: `4-bit NF4 config`,
            content: `from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

model = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    quantization_config=bnb_config,
    device_map="auto",
)`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `After loading with \`BitsAndBytesConfig\`, wrap the model with \`get_peft_model()\` from [[peft]] exactly as before — that combination is QLoRA.`,
          },
          {
            type: "quiz",
            question: `What is the core idea of QLoRA?`,
            options: [
              `Train the entire model in 4-bit precision`,
              `Keep a 4-bit frozen base model and train a small LoRA adapter on top`,
              `Only quantize the tokenizer, not the model`,
              `Replace the Trainer with a custom loop`,
            ],
            answer: 1,
            explanation:
              `QLoRA loads the base model in 4-bit (frozen) and trains a LoRA adapter in higher precision, combining both memory savings and effective fine-tuning.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Configure 4-bit NF4 Loading`,
          description:
            `Create a \`BitsAndBytesConfig\` with \`load_in_4bit=True\`, \`bnb_4bit_quant_type="nf4"\`, and \`bnb_4bit_compute_dtype=torch.bfloat16\`. Load \`"gpt2"\` with \`quantization_config=bnb_config\`.`,
          starterCode: `from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

`,
          solutionCode: `from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

model = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    quantization_config=bnb_config,
    device_map="auto",
)`,
          tests: [
            {
              id: 1,
              label: `Creates BitsAndBytesConfig`,
              keywords: [{ pattern: `BitsAndBytesConfig\\s*\\(` }],
            },
            {
              id: 2,
              label: `Uses nf4 quant type`,
              keywords: [{ pattern: `bnb_4bit_quant_type\\s*=\\s*["']nf4["']` }],
            },
            {
              id: 3,
              label: `Passes quantization_config`,
              keywords: [{ pattern: `quantization_config\\s*=\\s*bnb_config` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "capstone",
    title: `Capstone`,
    icon: "🏆",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-23",
        title: `Mini project — sentiment pipeline + fine-tune + push`,
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              `Bring it together: load a small dataset, tokenize it, fine-tune a classifier with \`Trainer\`, then publish it. This is the same recipe used for real production fine-tunes — just on a smaller scale. Swap the 200-example slice for the full dataset, add a GPU and a few more epochs, and this exact code structure is how teams ship internal classifiers, moderation models, and domain-specific NLP tools every day. If the base model or dataset were much bigger, the only things that would realistically change are the ones from the last two chapters: wrap the model in \`get_peft_model()\` before training, and load it with \`load_in_4bit=True\` if it doesn't fit in memory otherwise.`,
          },
          {
            type: "scenario",
            title: `From idea to a shared model`,
            content:
              `A team wants a lightweight classifier tuned to their own support tickets. This lesson's flow — dataset, tokenizer, Trainer, push_to_hub — is exactly how that ships.`,
          },
          {
            type: "code",
            lang: "python",
            label: `End-to-end sketch`,
            content: `from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
)

dataset = load_dataset("imdb")
small_train = dataset["train"].shuffle(seed=42).select(range(200))
small_test = dataset["test"].shuffle(seed=42).select(range(50))

name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name, num_labels=2)

def tokenize_fn(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

train_tok = small_train.map(tokenize_fn, batched=True)
test_tok = small_test.map(tokenize_fn, batched=True)

args = TrainingArguments(output_dir="./mini-run", num_train_epochs=1, per_device_train_batch_size=8)
trainer = Trainer(model=model, args=args, train_dataset=train_tok, eval_dataset=test_tok)
trainer.train()

model.push_to_hub("your-username/mini-imdb-classifier")
tokenizer.push_to_hub("your-username/mini-imdb-classifier")`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `You just ran the full Hugging Face recipe: dataset → tokenizer → model → Trainer → Hub.`,
          },
          {
            type: "quiz",
            question: `Which step comes right before push_to_hub() in this recipe?`,
            options: [
              `load_dataset()`,
              `trainer.train()`,
              `AutoTokenizer.from_pretrained()`,
              `tokenizer.tokenize()`,
            ],
            answer: 1,
            explanation:
              `You train first so there is a fine-tuned model worth publishing, then push it to the Hub.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `End-to-End Mini Classifier`,
          description:
            `Load a small IMDB sample, tokenize it, fine-tune with \`Trainer\` for 1 epoch, then \`push_to_hub("your-username/mini-imdb-classifier")\`.`,
          starterCode: `from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
)

`,
          solutionCode: `from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
)

dataset = load_dataset("imdb")
small_train = dataset["train"].shuffle(seed=42).select(range(200))

name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name, num_labels=2)

def tokenize_fn(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

train_tok = small_train.map(tokenize_fn, batched=True)

args = TrainingArguments(output_dir="./mini-run", num_train_epochs=1, per_device_train_batch_size=8)
trainer = Trainer(model=model, args=args, train_dataset=train_tok)
trainer.train()

model.push_to_hub("your-username/mini-imdb-classifier")
tokenizer.push_to_hub("your-username/mini-imdb-classifier")`,
          tests: [
            {
              id: 1,
              label: `Loads a dataset`,
              keywords: [{ pattern: `load_dataset\\s*\\(` }],
            },
            {
              id: 2,
              label: `Trains the model`,
              keywords: [{ pattern: `trainer\\.train\\s*\\(` }],
            },
            {
              id: 3,
              label: `Pushes the model to the Hub`,
              keywords: [{ pattern: `model\\.push_to_hub\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-24",
        title: `Review & cheat sheet`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `You made it! Core Hugging Face flow: **pipeline → tokenizer → model → dataset → Trainer → Hub → PEFT/quantization for scale**. Notice the shape of what you learned: \`pipeline()\` gets you inference in one line, \`Auto*\` classes give you control when you need it, \`datasets\` and \`Trainer\` take you from raw data to a fine-tuned model, and PEFT/quantization are what let that whole pipeline scale from a laptop experiment to a model serving real traffic. That's the same path professional ML engineers follow — you've just walked it end to end in miniature. Keep this cheat sheet handy when starting new projects.`,
          },
          {
            type: "table",
            title: `Hugging Face cheat sheet`,
            columns: [`Task`, `Snippet`],
            rows: [
              { label: `Quick inference`, values: [`Quick inference`, `pipeline("sentiment-analysis")("text")`] },
              { label: `Load model + tokenizer`, values: [`Load model + tokenizer`, `AutoModel...from_pretrained(name)`] },
              { label: `Load dataset`, values: [`Load dataset`, `load_dataset("name")`] },
              { label: `Train`, values: [`Train`, `Trainer(model, args, train_dataset).train()`] },
              { label: `Publish`, values: [`Publish`, `model.push_to_hub("user/repo")`] },
              { label: `Lightweight fine-tune`, values: [`Lightweight fine-tune`, `get_peft_model(model, LoraConfig(...))`] },
            ],
          },
          {
            type: "diagram",
            title: `Your learning path`,
            nodes: [
              {
                id: "core",
                label: `Core library`,
                color: "#FF9D00",
                items: [`pipeline, Auto*, tokenizers`],
              },
              {
                id: "data",
                label: `Data & Hub`,
                color: "#FFB84D",
                items: [`datasets, Hub, model cards`],
              },
              {
                id: "train",
                label: `Train & scale`,
                color: "#FFD180",
                items: [`Trainer, PEFT/LoRA, quantization`],
              },
            ],
          },
          {
            type: "callout",
            variant: "success",
            content:
              `Next steps: try a different task (translation, NER), explore Spaces to demo your model, and read a few model cards for models you use often.`,
          },
          {
            type: "quiz",
            question: `Which combination lets you fine-tune a large model on a single modest GPU?`,
            options: [
              `Full fine-tuning in float32`,
              `4-bit quantized base model + a LoRA adapter (QLoRA)`,
              `Only using pipeline() for inference`,
              `Loading the dataset with padding=False`,
            ],
            answer: 1,
            explanation:
              `QLoRA — a frozen 4-bit base model plus a small trainable LoRA adapter — is the pattern that makes this practical.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Cheat Sheet Print`,
          description:
            `Import \`pipeline\` from \`transformers\`, create a \`"sentiment-analysis"\` pipeline, and print its result on \`"Hugging Face is awesome!"\`.`,
          starterCode: `from transformers import pipeline

`,
          solutionCode: `from transformers import pipeline

classifier = pipeline("sentiment-analysis")
print(classifier("Hugging Face is awesome!"))`,
          tests: [
            {
              id: 1,
              label: `Imports pipeline`,
              keywords: [{ pattern: `from\\s+transformers\\s+import\\s+pipeline` }],
            },
            {
              id: 2,
              label: `Creates a pipeline`,
              keywords: [{ pattern: `pipeline\\s*\\(\\s*["']sentiment-analysis["']` }],
            },
            {
              id: 3,
              label: `Prints a result`,
              keywords: [{ pattern: `print\\s*\\(\\s*classifier\\s*\\(` }],
            },
          ],
        },
      },
    ],
  },
];

export const HUGGINGFACE_LESSONS = applyLessonVideoLinks(
  HUGGINGFACE_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      outcomes: l.outcomes ?? HUGGINGFACE_LESSON_OUTCOMES[l.id] ?? [],
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  HUGGINGFACE_VIDEO_LINKS,
);

export const HUGGINGFACE_TOTAL_XP = HUGGINGFACE_LESSONS.reduce((s, l) => s + l.xp, 0);

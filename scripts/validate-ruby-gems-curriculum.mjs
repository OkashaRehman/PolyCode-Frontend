/**
 * Run every Ruby theory example and challenge solution in rubyGemsCurriculum.js
 * through the same WASM wrapper used in the browser.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DefaultRubyVM } from "@ruby/wasm-wasi/dist/browser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wasmPath = path.join(__dirname, "../public/ruby/ruby-stdlib.wasm");
const curriculumUrl = pathToFileURL(
  path.join(__dirname, "../src/features/learn/ruby-gems/data/rubyGemsCurriculum.js"),
).href;

function prepareRubyLearnCode(code = "") {
  if (/\b(puts|print|pp)\b/.test(code)) return code;
  const names = [];
  const re = /^([A-Za-z_][\w]*)\s*=/gm;
  let match;
  while ((match = re.exec(code)) !== null) names.push(match[1]);
  const unique = [...new Set(names)];
  if (!unique.length) return code;
  const trailer = unique.map((name) => `puts "${name} = #{${name}}"`).join("\n");
  return `${code.replace(/\s*$/, "")}\n\n${trailer}\n`;
}

function rubyWarningOnly(stderr = "") {
  const lines = stderr
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return (
    lines.length > 0 &&
    lines.every((line) => /warning:/i.test(line) || line.includes("(polycode)"))
  );
}

function buildRubyWrapper(source) {
  let delim = `POLY_${Math.random().toString(36).slice(2, 12)}`;
  while (source.includes(delim)) {
    delim = `POLY_${Math.random().toString(36).slice(2, 12)}`;
  }

  return `
require "stringio"
__polycode_out = StringIO.new
__polycode_err = StringIO.new
$stdout = __polycode_out
$stderr = __polycode_err
begin
  eval(<<-'${delim}', binding, "(polycode)")
${source}
${delim}
rescue Exception => e
  __polycode_err.puts("#{e.class}: #{e.message}")
  if e.backtrace
    e.backtrace.first(8).each { |line| __polycode_err.puts(line) }
  end
ensure
  $polycode_stdout = __polycode_out.string
  $polycode_stderr = __polycode_err.string
  $stdout = STDOUT
  $stderr = STDERR
end
`;
}

function collectSnippets(lessons) {
  const items = [];
  for (const lesson of lessons) {
    for (const block of lesson.theory || []) {
      if (block.code?.lang === "ruby" && block.code.content) {
        items.push({
          id: lesson.id,
          kind: "theory",
          label: block.code.label || block.content?.slice(0, 40),
          code: block.code.content,
          learn: true,
        });
      }
      if (block.type === "code" && block.lang === "ruby" && block.content) {
        items.push({
          id: lesson.id,
          kind: "theory-prepend",
          label: block.label || block.content?.slice(0, 40),
          code: block.content,
          learn: true,
        });
      }
    }
    if (lesson.challenge?.solutionCode) {
      items.push({
        id: lesson.id,
        kind: "challenge",
        label: lesson.challenge.title,
        code: lesson.challenge.solutionCode,
        learn: true,
      });
    }
  }
  return items;
}

async function main() {
  const wasmBytes = await fs.promises.readFile(wasmPath);
  const module = await WebAssembly.compile(wasmBytes);
  const { vm } = await DefaultRubyVM(module);

  const { RUBY_GEMS_LESSONS } = await import(curriculumUrl);
  const snippets = collectSnippets(RUBY_GEMS_LESSONS);

  console.log(`Validating ${snippets.length} Ruby snippets...\n`);

  const failures = [];
  for (const item of snippets) {
    const source = item.learn ? prepareRubyLearnCode(item.code) : item.code;
    vm.eval(buildRubyWrapper(source));
    const stderr = vm.eval("$polycode_stderr")?.toString?.() ?? "";
    const stdout = vm.eval("$polycode_stdout")?.toString?.() ?? "";
    if (stderr.trim() && !rubyWarningOnly(stderr)) {
      failures.push({ ...item, stderr: stderr.trim(), stdout: stdout.trim() });
      console.log(`FAIL [${item.id}] ${item.kind}: ${item.label}`);
      console.log(`  ${stderr.trim().split("\n")[0]}\n`);
    } else {
      console.log(`OK   [${item.id}] ${item.kind}: ${item.label}`);
    }
  }

  console.log(`\n${failures.length} failure(s) of ${snippets.length}`);
  if (failures.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

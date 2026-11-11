function createDomBootstrapHtml(channel) {
  return `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /></head>
  <body>
    <h1 id="title">Hello</h1>
    <p class="card">Item one</p>
    <p class="card">Item two</p>
    <button class="btn">Click me</button>
    <input id="email" type="text" value="demo@example.com" />
    <input id="subscribed" type="checkbox" checked />
    <form id="demo-form"></form>
    <ul id="list"><li id="a">A</li><li id="b">B</li></ul>
    <script>
      (function() {
        const channel = ${JSON.stringify(channel)};
        const logs = [];
        const errors = [];

        function formatConsoleArgs(args) {
          return args
            .map((value) => {
              try {
                if (value === undefined) return "undefined";
                if (value === null) return "null";
                if (typeof value === "object") return JSON.stringify(value, null, 2);
                return String(value);
              } catch {
                return String(value);
              }
            })
            .join(" ");
        }

        function sendResult(result) {
          parent.postMessage(
            {
              __polycode_dom_sandbox__: true,
              channel,
              result,
            },
            "*",
          );
        }

        const consoleProxy = {
          log: (...args) => logs.push(formatConsoleArgs(args)),
          info: (...args) => logs.push(formatConsoleArgs(args)),
          warn: (...args) => logs.push("[warn] " + formatConsoleArgs(args)),
          error: (...args) => errors.push(formatConsoleArgs(args)),
          debug: (...args) => logs.push(formatConsoleArgs(args)),
          table: (...args) => logs.push(formatConsoleArgs(args)),
        };

        try {
          window.console = consoleProxy;
        } catch {
          try {
            Object.defineProperty(window, "console", {
              configurable: true,
              writable: true,
              enumerable: false,
              value: consoleProxy,
            });
          } catch {
            // Fallback: if console cannot be replaced, continue without capturing logs.
          }
        }

        const originalFetch = window.fetch.bind(window);
        window.fetch = async (url, options) => {
          const resolvedUrl = typeof url === "string" ? url : String(url);

          if (resolvedUrl.includes("jsonplaceholder.typicode.com/todos")) {
            return {
              ok: true,
              status: 200,
              statusText: "OK",
              headers: { get: () => "application/json" },
              json: async () => ({ userId: 1, id: 1, title: "Learn JavaScript APIs", completed: false }),
              text: async () => JSON.stringify({ userId: 1, id: 1, title: "Learn JavaScript APIs", completed: false }),
            };
          }

          if (resolvedUrl.includes("/missing.json") || resolvedUrl.includes("/404")) {
            return {
              ok: false,
              status: 404,
              statusText: "Not Found",
              headers: { get: () => "application/json" },
              json: async () => ({ error: "Not Found" }),
              text: async () => "Not Found",
            };
          }

          return originalFetch(url, options);
        };

        window.addEventListener("message", (event) => {
          if (
            !event.data ||
            event.data.__polycode_dom_sandbox__ !== true ||
            event.data.channel !== channel
          ) {
            return;
          }

            const source = event.data.source || "";

          const executeSource = async () => {
            try {
              const result = await eval("(async function() { 'use strict';\n" + source + "\n})()");
              if (result !== undefined) {
                logs.push(formatConsoleArgs([result]));
              }
              sendResult({
                stdout: logs.join("\n"),
                stderr: errors.join("\n"),
                error: errors[0] || null,
              });
            } catch (error) {
              sendResult({
                stdout: logs.join("\n"),
                stderr: error?.message || String(error),
                error: error?.message || String(error),
              });
            }
          };

          executeSource();
        });

        parent.postMessage(
          {
            __polycode_dom_sandbox__: true,
            channel,
            ready: true,
          },
          "*",
        );
      })();
    </script>
  </body>
</html>`;
}

export function needsDomRuntime(source = "") {
  return /\bdocument\b/.test(source) || /\bwindow\b/.test(source);
}

export function runJavaScriptWithDom(source = "") {
  return new Promise((resolve) => {
    const channel = `polycode-dom-${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.cssText =
      "position:fixed;width:0;height:0;border:0;opacity:0;pointer-events:none";

    let timeoutId = null;
    const cleanup = () => {
      window.removeEventListener("message", handleMessage);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      iframe.remove();
    };

    const handleMessage = (event) => {
      if (
        !event.data ||
        event.data.__polycode_dom_sandbox__ !== true ||
        event.data.channel !== channel
      ) {
        return;
      }

      if (event.data.ready) {
        iframe.contentWindow.postMessage(
          {
            __polycode_dom_sandbox__: true,
            channel,
            source,
          },
          "*",
        );
        return;
      }

      cleanup();
      resolve(event.data.result || {
        stdout: "",
        stderr: "No result returned from DOM sandbox.",
        error: "No result returned from DOM sandbox.",
      });
    };

    window.addEventListener("message", handleMessage);

    iframe.onerror = () => {
      cleanup();
      resolve({
        stdout: "",
        stderr: "Could not initialize DOM sandbox.",
        error: "Could not initialize DOM sandbox.",
      });
    };
    timeoutId = window.setTimeout(() => {
      cleanup();
      resolve({
        stdout: "",
        stderr: "DOM sandbox execution timed out.",
        error: "DOM sandbox execution timed out.",
      });
    }, 10000);
    document.body.appendChild(iframe);
    iframe.srcdoc = createDomBootstrapHtml(channel);
  });
}

const RUBY_WASM_SCRIPT = `${process.env.PUBLIC_URL || ""}/ruby/browser.umd.js`;

let loaderPromise = null;

function readDefaultRubyVM() {
  if (typeof window === "undefined") return undefined;
  return window["ruby-wasm-wasi"]?.DefaultRubyVM;
}

export function loadDefaultRubyVM() {
  const existing = readDefaultRubyVM();
  if (existing) {
    return Promise.resolve(existing);
  }

  if (!loaderPromise) {
    loaderPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        `script[src="${RUBY_WASM_SCRIPT}"]`,
      );

      const finish = () => {
        const DefaultRubyVM = readDefaultRubyVM();
        if (!DefaultRubyVM) {
          loaderPromise = null;
          reject(
            new Error(
              "Ruby WASM loader failed to initialize. Stop the dev server, run `npm start` in frontend (runs prestart), then hard-refresh.",
            ),
          );
          return;
        }
        resolve(DefaultRubyVM);
      };

      if (existingScript) {
        if (existingScript.dataset.loaded === "true") {
          finish();
          return;
        }
        existingScript.addEventListener("load", () => {
          existingScript.dataset.loaded = "true";
          finish();
        });
        existingScript.addEventListener("error", () => {
          loaderPromise = null;
          reject(new Error("Could not load the in-browser Ruby runtime."));
        });
        return;
      }

      const script = document.createElement("script");
      script.src = RUBY_WASM_SCRIPT;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = "true";
        finish();
      };
      script.onerror = () => {
        loaderPromise = null;
        reject(new Error("Could not load the in-browser Ruby runtime."));
      };
      document.head.appendChild(script);
    });
  }

  return loaderPromise;
}

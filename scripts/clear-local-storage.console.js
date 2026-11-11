/**
 * Paste this ENTIRE block into DevTools console while on the PolyCode origin
 * (e.g. http://localhost:3000/...). Do not run on about:blank.
 *
 * Prefer the page: http://localhost:3000/clear-local-storage.html
 */
(function () {
  var AUTH_KEYS = { token: 1, username: 1, profilePath: 1 };
  var LEARN_SUFFIXES = [
    "_progress",
    "_saved_code",
    "_bookmarks",
    "_last_lesson",
    "_notes",
  ];
  var LEARN_PATTERNS = [
    /_read_/,
    /_confidence_/,
    /_quiz_attempts_/,
    /^polycode_annotations_/,
  ];

  function listAllKeys() {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key) keys.push(key);
    }
    return keys.sort();
  }

  function isLearnKey(key) {
    for (var i = 0; i < LEARN_PATTERNS.length; i++) {
      if (LEARN_PATTERNS[i].test(key)) return true;
    }
    for (var j = 0; j < LEARN_SUFFIXES.length; j++) {
      if (key.endsWith(LEARN_SUFFIXES[j])) return true;
    }
    return false;
  }

  function selectKeys(mode) {
    var all = listAllKeys();
    if (mode === "all") return all;
    return all.filter(function (key) {
      if (isLearnKey(key)) return true;
      if (mode === "learn+auth" && AUTH_KEYS[key]) return true;
      return false;
    });
  }

  function clear(mode) {
    mode = mode || "learn";
    var keys = selectKeys(mode);
    keys.forEach(function (key) {
      localStorage.removeItem(key);
    });
    console.log("[PolyCode] removed " + keys.length + " key(s)", keys);
    return { mode: mode, keys: keys, removed: keys.length };
  }

  window.PolyCodeClearLocalStorage = {
    clear: clear,
    preview: function (mode) {
      mode = mode || "learn";
      return { mode: mode, keys: selectKeys(mode) };
    },
    listAllKeys: listAllKeys,
  };

  return clear("learn");
})();

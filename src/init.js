import { loadConfig } from "./lib/config.js";
import { router } from "./lib/router.js";

/**
 * @type {Map<string,string>|null}
 */
window.fetchMap = null;

function exec(target, that, args) {
  if (window.fetchMap !== null) {
    var path = args[0];
    args[0] = window.fetchMap[path] || path;
  }
  return target.apply(that, args);
}

/**
 * add support for a fetch map
 */
window.fetch = new Proxy(window.fetch, {
  apply: function (target, that, args) {
    // geting the fetch map dont run the middelware
    if (args[0].includes("/fetchmap.json")) {
      return exec(target, that, args);
    }
    // fetch map is null so pull it down
    if (window.fetchMap == null) {
      return fetch("/fetchmap.json", { cache: "no-store" })
        .then((i) => i.json())
        .catch((i) => {
          console.error("filed to parse json", i);
          // failed to parse fetch map but dont block
          return exec(target, that, args);
        })
        .then((json) => {
          window.fetchMap = json;
          return exec(target, that, args);
        })
        .catch((i) => {
          console.error(i);
          return exec(target, that, args);
        });
    }
    return exec(target, that, args);
  },
});

/**
 * set up nqs
 * @param {string} configPath
 */
export async function init(configPath) {
  await loadConfig(configPath);
  router.initAutoRoute();
  const path = window.location.pathname;
  router.goto(path);
  window.init = undefined;
}

export class Config {
  #config = {};
  constructor(config) {
    this.#config = config;
  }

  /**
   *
   * @returns {Map<string, RouteConfig>}
   */
  getRoutes() {
    return this.#config["routes"];
  }

  /**
   *
   * @param {string} path
   * @returns {RouteConfig}
   */
  getRoute(path) {
    const config = this.getRoutes();
    console.info(config);
    var data = config[path];

    if (data == null) {
      console.info("doing regex route check");
      const keys = Object.keys(config);
      console.info(keys);
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (config[key].isRegex === undefined || config[key].isRegex === null) {
          continue;
        }
        const match = new RegExp(key).exec(path);

        if (match !== null) {
          data = config[key];
          data.params = match.groups;
        }
      }
    } else {
      console.info("route found");
    }
    if (data == null) {
      console.info("404 route not found");
      return config["404"];
    }
    return data;
  }
}

/**
 * @type {Config}
 */
var config = null;

/**
 *
 * @returns
 * @type {Config}
 */
export function getConfig() {
  return config;
}

export async function loadConfig(path) {
  var data = await fetch(path);
  var json = await data.json();
  config = new Config(json);
}

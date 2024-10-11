export class Config {
    #config = {};
    constructor(config)
    {
        this.#config = config;
    }
    
    /**
     * 
     * @returns {Map<string, RouteConfig>}
     */
    getRoutes() {
        return this.#config['routes'];
    }

    /**
     * 
     * @param {string} path 
     * @returns {RouteConfig} 
     */
    getRoute(path) {
        const config = this.getRoutes();
        console.info(config)
        var data = config[path];
        
        if(data == null)
        {
            const keys = Object.keys(config);
            console.info(keys)
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                const match = new RegExp(key).exec(path);
                
                if(match !== null)
                {
                    data = config[key];
                    data.params = match.groups
                }                
            }
        }
        return data || config["404"];
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
export function getConfig()
{
    return config;
}

export async function loadConfig(path)
{

    var data = await fetch(path);
    var json = await data.json();
    config = new Config(json);
}

/**
 * Route Config.
 * @typedef {Object} RouteConfig
 * @property {string} html - Path to the html.
 * @property {string} layout - The layout file to use.
 * @property {string|null|undefined} script - Script to load.
 * @property {object} params
 */
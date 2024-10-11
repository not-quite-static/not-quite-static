import {loadConfig} from './lib/config.js'
import { router } from './lib/router.js'


window.fetchMap = null

function exec(target, that, args)
{
    if(window.fetchMap !== null)
    {
        var path = args[0]
        args[0] = window.fetchMap[path] || path;
    }
    return target.apply(that, args)
}

window.fetch = new Proxy(window.fetch, {
    apply: function (target, that, args) {
        if(args[0].includes('/fetchmap.json'))
        {
            return exec(target, that, args);
        }
        if(window.fetchMap == null)
        {
            return fetch('/fetchmap.json', {cache: "no-store"})
            .then(i=> i.json()).catch(i => {
                console.log("filed to parse json", i);
                return exec(target, that, args);
            })
            .then(json => {
                window.fetchMap = json;
                return exec(target, that, args);
            }).catch(i=> {
                console.log(i);
                return exec(target, that, args);
            });
        }
        return exec(target, that, args);
    },
    });

export async function init (configPath) {
    
    await loadConfig(configPath);
    router.initAutoRoute();
    const path = window.location.pathname;
    router.goto(path);
    window.init = undefined
}

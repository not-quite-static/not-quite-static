/**
 *
 * @type {Map<string, any>}
 */
const scripts = {};

let currentScript;

/**
 * loads a script
 * @param path
 * @returns {Promise<void>}
 */
export async function load(path)
{
  console.log(`Loading module ${path}`);
  scripts[path] = await import(path);
  console.log(`done loading module ${path}`);
}

/**
 *
 * @param path {string|null}
 */
export function current(path)
{
  console.log(`setting module ${path}`);
  currentScript = path;
}

/**
 * calls a method in the script
 * @param method {string}
 * @param args {{}}
 * @returns {Promise<any>}
 */
export async function call(method, args)
{
  if(currentScript === null)
  {
    console.log(`module not loaded`);
    return Promise.resolve();
  }
  if(scripts[currentScript][method] !== undefined)
  {
    console.log(`calling ${method}`);
    return await scripts[currentScript][method].apply(this, args);
  }
  else
  {
    console.log(`cant find ${method}`);
  }
}

import { getConfig } from "./config.js";

import { load, current, call } from "./script_manager.js";

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

async function render(html, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new AsyncFunction(...names, `return \`${html}\`;`)(...vals);
}

export const router = {
  currentPage: "",
  currentLayout: "",
  initAutoRoute: () => {
    var getParentAnchor = function (/**@type {EventTarget | null} */ element) {
      while (element !== null) {
        if (element.tagName && element.tagName.toUpperCase() === "A") {
          return element;
        }
        element = element.parentNode;
      }
      return null;
    };

    document.querySelector("body").addEventListener(
      "click",
      function (event) {
        var anchor = getParentAnchor(event.target);
        if (anchor !== null) {
          event = event || window.event;
          event.preventDefault();
          window.history.pushState({}, "", anchor.href);

          router.goto(window.location.pathname);
        }
      },
      false,
    );

    window.onpopstate = (event) => {
      event = event || window.event;
      event.preventDefault();
      window.history.pushState({}, "", event.target.href);
      const path = window.location.pathname;
      console.log("onpopstate:", path);
      const route = getConfig().getRoute(path);
      router.handel(route);
    };
  },
  handel: async (/** @type {RouteConfig} */ config) => {
    current(null)
    console.log(config);
    // does this page have a script for it?
    if (config["script"] !== undefined) {
      await import(config["script"])
    }
    if (config["module"] !== undefined) {
      await load(config["module"])
      current(config["module"])
    }
    // clear the current app
    // todo: save the last layout used so we know if we need to clear the whole app
    // document.getElementById("app").innerHTML = "";
    // load the layout if
    if (config["layout"] !== undefined) {
      if(router.currentLayout !== config["layout"])
      {
        const layout = await (await fetch(config["layout"])).text();
        document.getElementById("app").innerHTML = layout;
        router.currentLayout = config["layout"];
      }
      await router.renderPage("body", config);
    } else {
      await router.renderPage("app", config);

    }
    await call("init", null)
    router.currentPage = window.location.pathname;
  },
  goto: (/** @type {string} */ path) => {
    console.log("goto:", path);
    const route = getConfig().getRoute(path);
    router.handel(route);
  },
  renderPage: async (elId, config) => {
    if(config["html"] === undefined) {
      console.log("using js for page")
      document.getElementById(elId).innerHTML = "";

      const template = await call("render", {
        params: config.params,
      })
      template(document.getElementById(elId))
    }
    else
    {
      console.log("using html for page")
      const page = await (await fetch(config["html"])).text();
      const content = await render(page, {
        params: config.params,
      });
      document.getElementById(elId).innerHTML = "";
      document.getElementById(elId).innerHTML = content
    }
  }
};

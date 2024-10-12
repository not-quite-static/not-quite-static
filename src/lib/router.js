import { getConfig } from "./config.js";

function render(html, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${html}\`;`)(...vals);
}

export const router = {
  currentPage: "",
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
    console.log(config);
    // does this page have a script for it?
    if (config["script"] !== undefined) {
      const script = document.createElement("script");
      script.src = config["script"];
      script.type = "module";
      document.head.appendChild(script);
    }
    // clear the current app
    // todo: save the last layout used so we know if we need to clear the whole app
    document.getElementById("app").innerHTML = "";
    // load the layout if
    if (config["layout"] !== undefined) {
      const layout = await (await fetch(config["layout"])).text();
      document.getElementById("app").innerHTML = layout;

      const page = await (await fetch(config["html"])).text();
      document.getElementById("body").innerHTML = "";
      document.getElementById("body").innerHTML = render(page, {
        params: config.params,
      });
    } else {
      const page = await (await fetch(config["html"])).text();
      document.getElementById("app").innerHTML = "";
      document.getElementById("app").innerHTML = render(page, {
        params: config.params,
      });
    }
    router.currentPage = window.location.pathname;
  },
  goto: (/** @type {string} */ path) => {
    console.log("goto:", path);
    const route = getConfig().getRoute(path);
    router.handel(route);
  },
};

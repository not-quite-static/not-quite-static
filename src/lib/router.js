import { getConfig } from "./config.js";

function render(html, params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${html}\`;`)(...vals);
  }

export const router = {
    currentPage: '',
    initAutoRoute: () =>{

        var getParentAnchor = function (/**@type {EventTarget | null} */ element) {
            while (element !== null) {
              if (element.tagName && element.tagName.toUpperCase() === "A") {
                return element;
              }
              element = element.parentNode;
            }
            return null;
          };

        document.querySelector("body").addEventListener('click', function(event) {
            var anchor = getParentAnchor(event.target);
            if(anchor !== null) {
                event = event || window.event;
                event.preventDefault();
                window.history.pushState({}, "", anchor.href);

                router.goto(window.location.pathname);
            }
          }, false);

        window.onpopstate = (event) => {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", event.target.href);
            const path = window.location.pathname;
            console.log("onpopstate:", path);
            var route = getConfig().getRoute(path);
            router.handel(route);
        }
    },
    handel: async (config) => {
        console.log(config);
        if(config['script'] !== undefined)
        {
            var script = document.createElement('script');
            script.src = config['script'];
            script.type = "module";
            document.head.appendChild(script);
        }
        document.getElementById('app').innerHTML = ''
        if(config['layout'] !== undefined)
        {
            var layout = await (await fetch(config['layout'])).text();
            document.getElementById('app').innerHTML = layout;
        }
        var page = await (await fetch(config['html'])).text();
        document.getElementById('body').innerHTML = '';
        document.getElementById('body').innerHTML = render(page, {
            params: config.params
        });
        router.currentPage = window.location.pathname;
    },
    goto: (path) => {
        console.log("goto:", path);
        var route = getConfig().getRoute(path);
        router.handel(route);
    }
};
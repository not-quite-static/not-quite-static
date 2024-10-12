import { marked } from "/vender/js/marked.esm.js";

const _blog = {
  getBlogPage: async () => {
    const data = await (await fetch("/data/blog.json")).json()
    var posts = []
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      posts.push(`
        <div>
          <h4>${element.name} <a href="/blog/${element.page}">Read</a></h4>
        </div>
        `)

    }
    return "".concat(posts)
  },
  renderBlogPost: async (/**@type {string} */ path) => {

    const data = await (await fetch(path)).text()
    console.info(data)
    return marked.parse(data);
  }
};

window.blog = _blog;

export const blog = _blog;

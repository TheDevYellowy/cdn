import { existsSync, readFileSync } from "fs";

Bun.serve({
  port: 80,
  async fetch(req): Promise<Response> {
    const url = new URL(req.url);
    console.log(`${url.pathname} : ${this.requestIP(req)?.address} : ${existsSync(`.${url.pathname}`)}`);

    if(url.pathname.includes(`../`)) return new Response(null, { status: 403 });
    if(url.pathname.includes(`./`)) return new Response(null, { status: 403 });
    if(url.pathname.includes(`~`)) return new Response(null, { status: 403 });
    
    if(url.pathname.includes('.png')) {
      if(existsSync(`.${url.pathname}`)) return new Response(readFileSync(`.${url.pathname}`), { status: 200, headers: {
        'content-type': 'image/png'
      } });
    } else if(url.pathname.includes('.jpg')) {
      if(existsSync(`.${url.pathname}`)) return new Response(readFileSync(`.${url.pathname}`), { status: 200, headers: {
        'content-type': 'image/jpeg'
      }});
    }

    return new Response(null, { status: 204 });
  }
});

console.log(`CDN up and running`);
---
title: Building This Site
publishedAt: todo
snippet: How I built this website using Deno, Fresh, and Tailwind CSS. Also includes server setup with Debian, OpenSSH, and Nginx.
---

With the perpetual living death of social media, I've been looking for a place to put my spare thoughts - hopefully one that isn't owned by a corproate mass whose sole goal is to monetize my inner monologue. To that end I've decided to make a little blog. It's also served as a nice design and technical challenge, and I'm pretty happy with the results so far.

The first step was to set up a server machine.

# Setting up the Server

## SSH

When I'm out and about I always miss having my PC at my fingertips. As of writing, my build is running Debian Bookworm on a Ryzen 9, and anything else feels unacceptably slow. So my original goal in setting up a server was to have secure network-based access to my PC. To do this I installed OpenSSH, set up SSHD to run from an alternate port, and set up TOTP MFA with [Linux PAM](https://linux-pam.org). I followed [this blog post by chrisjrob](https://chrisjrob.com/2011/04/05/dynamic-dns-and-remote-ssh-and-vnc/) for SSH. The OATH setup largely followed the Arch Wiki guide for setting up [pam_oath](https://wiki.archlinux.org/title/Pam_oath), so I suggest reading that if you're interested in the process. Once I'd gotten SSH set up and secured on my local network, I got a domain from [FreeDNS](https://freedns.afraid.org) for testing. This worked well, but was very slow, so I ended up buying this domain ([ https://cubething.dev ](https://cubething.dev)).

## nginx

Once I had the domain I figured - why not build a website?

The first step is to set up a web proxy. I decided to use nginx over apache, simply because it is ubiquitous. Setting up nginx is actually very simple. First,

```bash
sudo apt install nginx
```

Then,

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

and navigate to your install directory (`/etc/nginx/` for Debian).

By default, nginx on Debian has a sample site made available. I suggest copying that sample site, and linking to it in your enabled sites.

```bash
cd /etc/nginx/
cp ./sites-available/defualt ./sites-available/YOUR_SITE
ln -s ./sites-available/YOUR_SITE ./sites_enabled/YOUR_SITE
```

Modify your site according to your needs. Because I'm on a .dev TLD, this meant enabling SSL. To set this up, you need to link your SSL certificate to your nginx configuration. When you buy the domain, your provider will probably generate the certificates for you. If not, you can always use certbot from [Let's Encrypt](https://letsencrypt.org). (Don't ask me for details!) Once you have the certs, create a config file with the paths for the certs, and include them in your main site.

`/etc/nginx/sites-available/YOUR_SITE`

```nginx
server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;

    include snippets/certs.conf;

    # ...
}
```

`/etc/nginx/snippets/certs.conf`

```nginx
ssl_certificate /path/to/your/cert.pem;
ssl_certificate_key /path/to/your/private.key.pem;
```

Just like that the nginx basic server was up and running. With that out of the way, it was time to actually build the blog.

# Building the Site

This site is built with Deno on the Fresh framework.

## Deno

[Deno](https://deno.land) is a server-side JavaScript runtime with native Typescript support. It is written in Rust and is focused on security and web compatibility. The original goal for Deno was to be a successor runtime to Node.js. It was announced in a 2018 talk called [10 Things I Regret about Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA). There was quite a bit of buzz around it when it first launched, but that hype has died down a bit in favor of [Bun](https://bun.sh). Being a Rust programmer, of course I had heard of Deno, and being a Typescript programmer, I wanted to give a native TS runtime a shot. So I decided to give it a try and built this website with it.

My experience with Deno has been pretty good, though there are a few things I struggled with. Installing and using Deno has been a breeze. The native typescript support is fantastic, and the global cache means your repository doesn't get cluttered with nonsense - and you save disk space. My main problem is that some TypeScript dependency resolution fails. For example, this website is using [ PrismJS ](https://prismjs.com) to highlight code blocks. However, the type specifications for language extensions fail to load, causing around 1 second of latency between builds while it tries to fetch the (non-existent) depedencies. This is likely a compatibility issue, since Deno doesn't aim for total Node.js interoperation. There is probably workaround for this, but I have to find this. However, I also got this error when loading in the Katex dependencies from [deno gfm](https://deno.land/x/gfm@0.2.1), which is used in the offically supported Fresh framework.

Aside from these few issues, my experience with Deno has been pretty good. It's fantastic for spinning up quick TS scripts, and using `deno compile` makes it easy to spin up executables. Though, I wonder to what extent this is a good idea. Why not opt for a scripting language that has been designed for server-side use, like Python or Ruby, and which have sane defaults? Perhaps Deno's safety model is appealing, though I wonder if the executable sizes and speeds are worth the tradeoff. (I'll have to look into that.)

## Fresh

Anyways, let's talk about how this site was actually built.

[Fresh](https://fresh.deno.dev) is a server-side rendering framework based on the [islands architecture](https://jasonformat.com/islands-architecture/). It's built with speed in mind - and yeah, it's fast! I have not measured the latency or compared it to Node.js, but there is a palpable difference in performance. Fresh gives you the advantage of a modern development experience using Preact (a lightweight React alternative) and comes with a Twind plugin (a lightweight Tailwind alternative). So, you get the convenience of working with JSX/TSX and CSS-in-JS and the speed of server-side rendering.

Almost everything is statically rendered on the backend. Only the components stored in the `islands/` directory will be rendered client-side. The biggest trade-off of this design IMO is that you may not get access to tools like the React inspector. For this website, that was not an issue anyways.

## Dependency Management

To create the blog, I followed [this blog post](https://deno.com/blog/build-a-blog-with-fresh). However, I didn't particularly like the way gfm renders markdown, so I switched to [markdown-it](https://github.com/markdown-it/markdown-it). This was a foreign dependency!

There are several ways to install dependencies in Deno. The primary option is to use a direct URL import.

```typescript
import { foobar } from "https://some.example.url/mod.ts";
```

If you're building an executable application (like a blog), you're encouraged to use an [import map](https://deno.land/manual@v1.31.1/basics/import_maps) to manage your dependencies. However, if you're building a library, you're encouraged to use a [`deps` module](https://deno.land/manual@v1.31.1/examples/manage_dependencies). This is slightly confusing, but not a huge issue.

It can be very annoying to manually enter the URLs every time you want to import something. Thankfully, there are several CDNs out there which host deno-compatible modules. The officially deigned options are [deno.land/x/](https://deno.land/x/), which hosts Deno-specific libraries; [skypack.dev](https://skypack.dev), which is basically a browser bundler for NPM packges; and [esm.sh](https://esm.sh) which is specifically designed for ESM libraries. Deno.land/x/ works great, obviously. Skypack's search seems broken, so I haven't been able to try it. I was initially excited about esm.sh because they offer a [CLI](https://esm.sh/#cli) - but they do not offer a search functionality at all. So my process has been `npm search $PKG`; `deno task esm:add $PKG`. However, most of the modules I need are not available through esm.sh. So, I've stared using [jsdelivr](https://jsdelivr.com). This is nice

Again, because Node.js uses CommonJS, not every module will be compatible with Deno. If you run into this issue, you can polyfill the import map to override any missing dependencies, such as `fs`.

`esm.sh` worked just fine for importing PrismJS. But `markdown-it` is not included on esm.sh. However, Deno now offers direct npm compatibility. You can specify a dependency as just `npm:/some-package`. This worked just fine for `markdown-it`.

Honestly, Deno's dependency management - one of it's core features - is kind of a mess! There is no centralized method of specifying dependencies, which makes it inconvenient to use, and actively cost me a day and a half of fiddling around with compatible CDNs.

## Styling

Once the blog was in place and I was rendering basic Markdown, I needed to style the site. Fresh comes with a [twind](https://twind.style) plugin, and will prompt you to install it on project initialization, so I was good to go. However, rendering Markdown on the fly meant that twind wouldn't be able to pre-load the right styles. Of course, there is a solution, the [typography plugin](https://tailwindcss.com/docs/typography-plugin). Luckily, [twind supports this](https://twind.style/packages/@twind/preset-typography) (and many other plugins).

Styling with Tailwind was pretty straightforward. There are a few considerations that need to be made when using Fresh, for instance you'll need to add any dynamically rendered styles to your safelist - but this strikes me as true in any dynamic environment.

There was one issue I had when styling. I wanted to include some hand-made SVGs on the site, and I wanted them to be served as static files. I could not figure out a good way to import these files using Fresh's static serving. I ended up copying the SVG files into TSX components. This had the added benefit of making them far more interactable, though I had to manually edit the tags to remove inkscape-specific XML.

This site also makes an attempt to be screen-reader and tab-through friendly. I use these technologies a lot myself.

# Deploying

## Azure

I wanted to get some practice deploying to the cloud, so I decided to deploy this app to Azure in addition to my own domain just to test it. To do so I followed [this tutorial](https://www.codestack.be/blog/run-deno-containerized-web-application-on-microsoft-azure-container-registry/).

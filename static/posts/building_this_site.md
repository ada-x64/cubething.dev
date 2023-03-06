---
title: Building This Site
snippet: How I built this website using Deno, Fresh, and Tailwind CSS. Also includes server setup with Debian, OpenSSH, and Nginx.
---

With the perpetual living death of social media, I've been looking for a place to put my spare thoughts - hopefully one that isn't owned by a corporate mass whose sole goal is to monetize my inner monologue. To that end I've decided to make a little blog. It's also served as a nice design and technical challenge, and I'm pretty happy with the results so far.

[[toc]]

The first step was to set up a server machine.

## Setting up the Server

### SSH

When I'm out and about I always miss having my PC at my fingertips. As of writing, my build is running Debian Bookworm on a Ryzen 9, and anything else feels unacceptably slow. So my original goal in setting up a server was to have secure network-based access to my PC. To do this I installed OpenSSH, set up SSHD to run from an alternate port, and set up TOTP MFA with [Linux PAM](https://linux-pam.org). I followed [this blog post by chrisjrob](https://chrisjrob.com/2011/04/05/dynamic-dns-and-remote-ssh-and-vnc/) for SSH. The OATH setup largely followed the Arch Wiki guide for setting up [pam_oath](https://wiki.archlinux.org/title/Pam_oath), so I suggest reading that if you're interested in the process. Once I'd gotten SSH set up and secured on my local network, I got a domain from [FreeDNS](https://freedns.afraid.org) for testing. This worked well, but was very slow, so I ended up buying this domain ([https://cubething.dev](https://cubething.dev)).

### nginx

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
cp ./sites-available/default ./sites-available/YOUR_SITE
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

### ufw

Of course, to keep things safe, we need to set up a firewall. [ufw](https://wiki.archlinux.org/title/Uncomplicated_Firewall) is a powerful and simple firewall. On Debian, install with

```bash
sudo apt install ufw
```

Then, to set up nginx and SSH access, you'll need to add the appropriate rules:

```bash
# By default, do not allow access
sudo ufw default deny
# But, allow serving from localhost
sudo ufw allow from 192.168.0.0/24
# This allows connections through ports 80 and 443
sudo ufw allow 'Nginx Full'
# This allows TCP connections through port 22
sudo ufw allow ssh
# If you're using an alternate port for SSH, set it up like this
sudo ufw allow 1234/tcp
```

If this worked, you should be able to connect to your domain and SSH into your server. Your ufw status may look like this:

```bash
$ sudo ufw status verbose
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
80,443/tcp (Nginx Full)    ALLOW IN    Anywhere
1234/tcp                   ALLOW IN    Anywhere
Anywhere                   ALLOW IN    192.168.0.0/24
80,443/tcp (Nginx Full (v6)) ALLOW IN    Anywhere (v6)
1234/tcp (v6)              ALLOW IN    Anywhere (v6)
```

Just like that we have SSH and an nginx server up and running. With that out of the way, it was time to actually build the blog.

## Building the Site

This site is built with Deno on the Fresh framework.

### Deno

[Deno](https://deno.land) is a server-side JavaScript runtime with native Typescript support. It is written in Rust and is focused on security and web compatibility. The original goal for Deno was to be a successor runtime to Node.js. It was announced in a 2018 talk called [10 Things I Regret about Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA). There was quite a bit of buzz around it when it first launched, but that hype has died down a bit in favor of [Bun](https://bun.sh). Being a Rust programmer, of course I had heard of Deno, and being a Typescript programmer, I wanted to give a native TS runtime a shot. So I decided to give it a try and built this website with it.

My experience with Deno has been pretty good, though there are a few things I struggled with. Installing and using Deno has been a breeze. The native typescript support is fantastic, and the global cache means your repository doesn't get cluttered with nonsense - and you save disk space. My main problem is that some TypeScript dependency resolution fails. For example, this website is using [PrismJS](https://prismjs.com) to highlight code blocks. However, the type specifications for language extensions fail to load, causing around 1 second of latency between builds while it tries to fetch the (non-existent) dependencies. This is a compatibility issue - loading ESModules from a CDN often results in a lack of type definitions, especially for packages which don't include types out of the box. I haven't had luck with _any_ CDN, which is a huge problem for Deno's proposition to use CDN based dependency management. More on this [below](#dependency_management).

Aside from these few issues, my experience with Deno has been pretty good. It's fantastic for spinning up quick TS scripts, and using `deno compile` makes it easy to spin up executables. Though, I wonder to what extent this is a good idea. Why not opt for a scripting language that has been designed for server-side use, like Python or Ruby, and which have sane defaults? Perhaps Deno's safety model is appealing, though I wonder if the executable sizes and speeds are worth the tradeoff. (I'll have to look into that.)

### Fresh

Anyways, let's talk about how this site was actually built.

[Fresh](https://fresh.deno.dev) is a server-side rendering framework based on the [islands architecture](https://jasonformat.com/islands-architecture/). It's built with speed in mind - and yeah, it's fast! I have not measured the latency or compared it to Node.js, but there is a palpable difference in performance. Fresh gives you the advantage of a modern development experience using [Preact](https://preactjs.com) (a lightweight React alternative) and comes with a [Twind](https://twind.style) plugin (a lightweight Tailwind alternative). So, you get the convenience of working with JSX/TSX and CSS-in-JS and the speed of server-side rendering.

Almost everything is statically rendered on the backend. Only the components stored in the `islands/` directory will be rendered client-side. The biggest trade-off of this design IMO is that you may not get access to tools like the React inspector. For this website, that was not an issue anyways.

### Dependency Management

To create the blog, I followed [this Deno.com blog post](https://deno.com/blog/build-a-blog-with-fresh). However, I didn't particularly like the way gfm renders markdown, so I switched to [markdown-it](https://github.com/markdown-it/markdown-it). This was a foreign dependency!

There are several ways to install dependencies in Deno. The primary option is to use a direct URL import.

```typescript
import { foobar } from "https://some.example.url/mod.ts";
```

If you're building an executable application (like a blog), you're encouraged to use an [import map](https://deno.land/manual@v1.31.1/basics/import_maps) to manage your dependencies. However, if you're building a library, you're encouraged to use a [`deps` module](https://deno.land/manual@v1.31.1/examples/manage_dependencies). This is slightly confusing, but not a huge issue.

It can be very annoying to manually enter the URLs every time you want to import something. There are several CDNs out there which claim to host Deno-compatible modules. The officially deigned options are [deno.land/x/](https://deno.land/x/), which hosts Deno-specific libraries; [skypack.dev](https://skypack.dev), which is basically a browser bundler for NPM packages; and [esm.sh](https://esm.sh) which is specifically designed for ESM libraries. Deno.land/x/ works great, obviously. Skypack's search seems broken, so I haven't been able to try it. I was initially excited about esm.sh because they offer a [CLI](https://esm.sh/#cli) - but they do not offer a search functionality at all. So my process has been `npm search $PKG`; `deno task esm:add $PKG`. However, most of the modules I need are not available through esm.sh. So, I tried using [jsdelivr](https://jsdelivr.com), but Deno's import maps can't grab types independently (cannot find the module located at `index.ts`). The best option I've found is just to use the NPM package directly (`import {foo} from "npm:/SomePkg"`).

Again, because Node.js uses CommonJS, not every module will be compatible with Deno. If you run into this issue, you can polyfill the import map to override any missing dependencies, such as `fs`.

Honestly, Deno's dependency management - one of it's core features - is kind of a mess! There is no centralized method of specifying dependencies, which makes it inconvenient to use, and actively cost me a day and a half of fiddling around with compatible CDNs.

#### A Solution to Dependency Hell

The most consistent solution I've found is to create a `deps` folder with an individual file for each dependency. Traditionally, there is the `deps.ts` file, but this [may lead to compile time issues](https://github.com/wongjiahau/deno-mod-benchmark). This article is rather old, though. I just prefer to have each dependency individually listed for clarity. This also allows you to import types for NPM packages that lack them, and to do any preprocessing necessary for the dependencies. prismjs was especially in need of this:

`prismjs.ts`

```typescript
//@deno-types="npm:/@types/prismjs@1.26.0"
import Prism from "npm:/prismjs";
import loadLanguages from "npm:/prismjs/components/index.js";
loadLanguages([
  "rust",
  "jsx",
  "tsx",
  "typescript",
  "bash",
  "nginx",
  "docker",
  "dockerfile",
]);

export default Prism;
```

```plaintext
~/dev/deno/cubething/..
  .git
  ayu-colors
  ✗ components
  ✗ deps
     markdown-it.ts
     ✗ paths.ts
     ✗ prismjs.ts
  ✗ islands
  models
  ✗ routes
  ✗ ★ static
   .gitignore
   .gitmodules
   ★ cspell.json
   deno.json
   deno.lock
   deploy.sh
   dev.ts
  󰡨 Dockerfile
   import_map.json
   main.ts
   README.md
   ✗ twind.config.ts
```

This boils down to the single responsibility principle. Each module should have one responsibility - in this case, our deps/ modules should have the responsibility of loading in dependencies.

### Automatic Timestamps

One of the things I changed from the Fresh blog template was to remove timestamps from the frontmatter and instead detect the last modified date. On linux, this is the file's `mtime` (modified time). Deno makes it easy to detect file stats. The code below is fairly self-explanatory:

`util/posts.ts`

```typescript
export async function getPost(slug: string): Promise<Post | null> {
  const path = join("./posts", `${slug}.md`);
  const text = await Deno.readTextFile(path);
  const mtime = (await Deno.stat(path)).mtime;
  const { attrs, body } = extract<Record<string, string>>(text);
  return {
    slug,
    title: attrs.title,
    mtime,
    content: body,
    snippet: attrs.snippet,
  };
}
```

The ease with which Deno can perform I/O operations is definitely one of its stronger suits.

### Styling

Once the blog was in place and I was rendering basic Markdown, I needed to style the site. Fresh comes with a [twind](https://twind.style) plugin, and will prompt you to install it on project initialization, so I was good to go. However, rendering Markdown on the fly meant that twind wouldn't be able to pre-load the right styles. Of course, there is a solution, the [typography plugin](https://tailwindcss.com/docs/typography-plugin). Luckily, [twind supports this](https://twind.style/packages/@twind/preset-typography) (and many other plugins).

Styling with Tailwind was pretty straightforward. There are a few considerations that need to be made when using Fresh, for instance you'll need to add any dynamically rendered styles to your safelist - but this strikes me as true in any dynamic environment. Listing styles directly in javascript is nice conceptually, but ends up being a horrible mess for dynamic content. A lot of the time I'm just copy-pasting code around (Tailwind discourages creating wrapper classes). In addition, creating a single string with sometimes 13 classes in it is ugly. The easiest solution I found was to wrap them in an array and join them, though I'm sure a SCSS-like nested map would be possible.

In addition to CSS styling, I wanted to include some hand-made SVGs on the site, and I wanted them to be served as static files. I could not figure out a good way to import these files using Fresh's static serving. I ended up copying the SVG files into TSX components. This had the added benefit of making them far more interactable, though I had to manually edit the tags to remove inkscape-specific XML.

This site also makes an attempt to be screen-reader and tab-through friendly. I use these technologies a lot myself.

## Deploying

Once the site was built, I needed to make it available for consumption. There are two options: self-hosting and cloud hosting. I'm opting to self-host because I don't want to incur any accidental costs. I also want access to my machine from a convenient domain - and although this is possible to do through a cloud server (essentially creating a VPN), I want to reduce latency as much as possible. However, I figured that deploying to the cloud could be useful practice, so I go over that in this article as well.

### Local Deployment with Nginx

#### Daemonizing Deno with PM2

In order to deploy to nginx, you need to set up a proxy. Essentially, this will tell the server to look at an application which is hosted at a localhost port. So, we need some way to daemonize our Deno process. There are many Node.js process managers, but the only one which will work with Deno (or any other interpreter) is [PM2](https://pm2.keymetrics.io). PM2 will daemonize the process and load balance for you. To run a deno process in PM2, use the `--interpreter` and `--interpreter-args` flags.

```bash
sudo npm i pm2 -g
pm2 start main.ts --name test --interpreter="deno" --interpreter-args="run -A"
```

This works just fine, navigating to port 8080 shows the site. But, I want the deployed site to be on a different port than the development port. To do this I added an environment check to my `main.ts`

`main.ts`

```typescript
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

import twindPlugin from "twind_fresh_plugin/twind.ts";
import twindConfig from "@/twind.config.ts";

await start(manifest, {
  port: parseInt(Deno.env.get("DENO_PORT") ?? "8000"),
  plugins: [twindPlugin(twindConfig)],
});
```

Running a Fresh application directly through PM2 will cause errors due to the way Fresh caches the rendered artifacts. So, we need to create a deployment script, and run _that_ through PM2.

`deploy.sh`

```bash
#!/bin/bash
MAIN=/path/to/your/main.ts
export DENO_PORT=1234

GIT_REVISION=$(git rev-parse HEAD)
export DENO_DEPLOYMENT_ID=${GIT_REVISION}

deno cache "$MAIN"
deno run -A "$MAIN"
```

(This is adapted from the [Container section](https://fresh.deno.dev/docs/concepts/deployment) of Fresh's deployment docs.)

I ran the script:

```bash
sudo pm2 start deploy.sh
```

Then, I updated my site config to match the [PM2 specifications](https://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup):

`/etc/nginx/sites-available/YOUR_SITE`

```nginx
upstream YOUR_SITE {
	server 127.0.0.1:1234;
	keepalive 64;
}

server {
	listen 443 ssl default_server;
	listen [::]:443 ssl default_server;
	include snippets/certs.conf;

	server_name www.YOUR_SITE.tld;

	location / {
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header Host $http_host;

		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";

		proxy_pass http://YOUR_SITE/;
		proxy_redirect off;
		proxy_read_timeout 240s;
	}
}
```

The last thing to do was to add PM2 as a systemd unit:

```bash
sudo pm2 startup;
sudo pm2 save
```

Now we have a simple blog routing through nginx, protected by ufw and SSL, and safely allowing remote access through SSH and TOTP.

### Cloud Deployment

I wanted to get some practice deploying to the cloud, so I decided to deploy this app to Azure in addition to my own domain just to test it. To do so I followed [this tutorial](https://www.codestack.be/blog/run-deno-containerized-web-application-on-microsoft-azure-container-registry/).

#### Setting up Docker and Azure

The first thing was to install Docker on my machine. The installation was simple enough, and you can follow the [official guide](https://docs.docker.com/desktop/install) for your OS.

Then, I created a Container Registry on Azure. This can be accomplished through the portal, or [through the CLI](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli). The next step was to follow the instructions in the Quick Start blade.

#### Docker Login - Password Management

Logging in proved to be difficult. In order to use `docker login`, I needed to install a few password management packages. This is what worked for me:

```bash
sudo apt install gnupg2 pass
```

Then, in order to initialize my password manager, I ran the following:

```bash
gpg --generate-key
```

This produced a public key, which I then copied into this command:

```bash
pass init $PUB_KEY
```

Once you've done this, you can always find your public keys again by running

```bash
gpg --list-public-keys
```

I was then able to log in to my Azure container using the information provided in the portal.

```bash
docker login mytestdomain.azurecr.io
```

#### Containerizing the App

Creating the container for the Fresh application was fairly simple. You can follow the instructions [on the Fresh page](https://fresh.deno.dev/docs/concepts/deployment).

Create the Dockerfile:

```dockerfile
FROM denoland/deno:1.25.0

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

COPY . .
RUN deno cache main.ts --import-map=import_map.json

EXPOSE 8000

CMD ["run", "-A", "main.ts"]
```

Then, build the image:

```bash
docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) -t my-fresh-app .
```

Feel free to run it to test it.

The next step to deploy it is to push it to your azure repository. First, ensure you're logged in.

```bash
az acr login --name mytestdomain
```

Then, tag your container, and push it to the repository:

```bash
docker tag my-fresh-app mytestdomain.azurecr.io/deno
docker push mytestdomain.azurecr.io/deno
```

Now the container is on the repo! The next step is to get it running.

#### Running the Web App

This one is easy. Just create a Container Application. On the portal, you will be given the option to select your previously created registry. Select that registry, and select the container you just pushed. Make sure to enable Ingress and select the appropriate port - in this case, port 8000. Wait for it to initialize, and your application will be running on an azure server :) Easy.

### CI/CD

Running the build script every time is annoying. Let's integrate CI/CD.

#### Git Hooks and Self-Hosted Repositories

For a self-hosted website, it is common practice to have a bare Git repository to store your files. To create a bare git repository, do the following:

```bash
mkdir YOUR_SITE.git
git init --bare YOUR_SITE.git
```

It's customary to add the .git extension, but as per usual extensions are semantic only. A bare repository is just the git info. There is no file replication here, only the raw compressed data. This is useful for accessing your repository from multiple machines, and for perfoming CI/CD with git hooks.

Git hooks are just scripts that run on certain git events. ([More here.](https://www.atlassian.com/git/tutorials/git-hooks)) We're only going to need server-side git hooks. In particular, we'll only need `post-update`. So, let's make it!

```bash
ls YOUR_SITE.git/hooks
applypatch-msg.sample      pre-applypatch.sample      pre-rebase.sample
commit-msg.sample          pre-commit.sample          pre-receive.sample
fsmonitor-watchman.sample  pre-merge-commit.sample    push-to-checkout.sample
post-update                prepare-commit-msg.sample  update.sample
post-update.sample         pre-push.sample
```

Copy the post-update.sample file. I've added this code to it (adapted from [@bmiddha/deploy-with-git-hooks](https://github.com/bmiddha/deploy-with-git-hooks)):

```bash
#!/bin/bash

TARGET="/var/www"
GIT_DIR="YOUR_DIRECTORY.git"
BRANCH="main"
REF="$GIT_DIR"/$1

if [[ $REF = "$GIT_DIR"/refs/heads/"$BRANCH" ]];
then
        echo "Ref $REF received. Deploying ${BRANCH} branch to production..."
        if [ -d "$TARGET" ]
        then
            rm -rf "$TARGET"
        fi
        mkdir -p "$TARGET"
        git --work-tree="$TARGET" --git-dir="$GIT_DIR" checkout -f

        DEPLOY="$TARGET"/deploy.sh

        chmod +x "$DEPLOY"
        $DEPLOY "$TARGET"

else
        echo "Ref $REF received. Doing nothing: only the ${BRANCH} branch may be deployed on this server."
fi
```

Since /var/www is a root directory, we'll need to execute this as root. So, rename the above to `post-update.sudo` and create the following `post-update` file:

```bash
#!/bin/bash
sudo YOUR_DIRECTORY.git/hooks/post-update.sudo "$1"
```

This will execute the update script as root.

In addition, I've updated `deploy.sh` to automatically run pm2:

```bash
#!/bin/bash

PWD=$1

echo "$PWD"/run.sh << EOF

MAIN="$PWD"/main.ts
export DENO_PORT=3000

GIT_REVISION=\$(git rev-parse HEAD)
export DENO_DEPLOYMENT_ID=\${GIT_REVISION}

deno cache "\$MAIN"
deno run -A "\$MAIN"

EOF

sudo pm2 delete YOUR_SITE
sudo pm2 start "$PWD"/run.sh --name YOUR_SITE
sudo pm2 save
```

#### GitHub Actions

## Concluding Thoughts

I'm pretty happy with how this is turning out so far. Once you get used to Deno and Fresh, they're pretty intuitive to use, and offer better performance and a better TypeScript experience than Node.js. The biggest issue is honestly that the ecosystem is so young, and there are not as many tutorials as I would hope. The inclusion of NPM modules as a first-class import style is a huge boon for Deno - I don't think making this website would have turned out so well without it.

I still have a lot to do as of writing (5 Mar. 2023). In addition to a simple blog, I'd like this website to include things like graphics showcases, contact information, and my cirricula vitae.

import { Handlers, PageProps } from "$fresh/server.ts";
import { getTime } from "@/deps/time.ts";
import Markdown from "@/components/pageComponent/Markdown.tsx";
import { TimeStyle, TwClass } from "@/deps/styles.ts";
import { getGfxModule, GfxModule } from "@/deps/gfx-module.ts";
import GfxIframe from "@/islands/GfxIframe.tsx";
import { join } from "$std/path/mod.ts";
import HeadComponent from "@/components/layout/Head.tsx";
import Head from "@/components/layout/Head.tsx";
import NavBtn from "@/islands/NavBtn.tsx";
import Title from "@/components/pageComponent/Title.tsx";

export const handler: Handlers<GfxModule> = {
  async GET(_req, ctx) {
    const post = await getGfxModule(ctx.params.slug);
    return post === null ? ctx.renderNotFound() : ctx.render(post);
  },
};

export default function GfxPage(props: PageProps<GfxModule>) {
  const module = props.data;

  const article_class = TwClass([
    "px-4",
    "lg:px-16",
    "flex-auto",
    "flex",
    "flex-col",
    "scroll-smooth",
    "w-full",
    "md:max-w-screen-md",
  ]);

  return (
    <>
      <HeadComponent />
      <Head>
        <title>{`cubething.dev → ${module.title.toLowerCase()}`}</title>
      </Head>
      <NavBtn route={props.route} />
      <main
        class={TwClass([
          "flex",
          "justify-center",
          "flex-col",
          "flex-auto",
          "items-center",
        ])}
      >
        <div class={article_class}>
          <Title title={module.title} route={props.route} />
          <time class={TwClass([TimeStyle, "text-center", "-mt-2", "mb-2"])}>
            {getTime(module.mtime)}
          </time>
        </div>
        <div>
          <GfxIframe
            title={module.title}
            width={1024}
            /* It doesn't like having the exact height. */
            height={780}
            src={join("/gfx-modules", module.slug, "index.html")}
          >
          </GfxIframe>
        </div>
        <div class={article_class} tabIndex={0}>
          <Markdown
            title={module.title}
            content={module.text_content}
          >
          </Markdown>
        </div>
      </main>
    </>
  );
}

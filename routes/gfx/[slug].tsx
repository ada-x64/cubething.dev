import { Handlers, PageProps } from "$fresh/server.ts";
import { getTime } from "@/deps/time.ts";
import Markdown from "@/components/article/Markdown.tsx";
import { TimeStyle, TwClass } from "@/deps/styles.ts";
import { getGfxModule, GfxModule } from "@/deps/gfx-module.ts";
import GfxIframe from "@/islands/GfxIframe.tsx";
import { join } from "$std/path/mod.ts";
import Title from "@/components/layout/Title.tsx";
import Layout from "@/components/layout/Layout.tsx";
import MainContent from "@/components/layout/MainContent.tsx";
import Footer from "@/components/layout/Footer.tsx";

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
    "items-center",
  ]);

  return (
    <Layout title={module.title} route={props.route}>
      <MainContent twClass={article_class}>
        <Title title={module.title} route={props.route} />
        <time class={TwClass([TimeStyle, "text-center", "-mt-2", "mb-2"])}>
          {getTime(module.mtime)}
        </time>

        <div>
          <GfxIframe
            title={module.title}
            width={1024}
            /* It doesn't like having the exact height. */
            height={780}
            slug={module.slug}
            origin={props.url.origin}
          />
        </div>

        <Markdown title={module.title} content={module.text_content} />
        <Footer />
      </MainContent>
    </Layout>
  );
}

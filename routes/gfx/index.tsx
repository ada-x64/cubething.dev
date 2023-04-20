import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "@/components/layout/Layout.tsx";
import { getGfxModules, GfxModule } from "@/deps/gfx-module.ts";
import GfxCard from "@/components/gfx/GfxCard.tsx";
import { OutboundLink } from "@/deps/styles.ts";
import Article from "@/components/article/Article.tsx";
import ArticleBlurb from "@/components/article/ArticleBlurb.tsx";

export const handler: Handlers<GfxModule[]> = {
  async GET(_req, ctx) {
    const modules = await getGfxModules();
    return ctx.render(modules);
  },
};

export default function Archive(props: PageProps<GfxModule[]>) {
  const modules = props.data;
  return (
    <Layout title={"gfx"} route={props.route}>
      <Article title={"gfx"} route={props.route}>
        <ArticleBlurb>
          This page contains a gallery of all my previous graphics showcases.
          The graphics on this page are largely developed with{" "}
          <a href="https://github.com/ada-x64/sundile_rs" class={OutboundLink}>
            Sundile
          </a>
          , my game engine.
        </ArticleBlurb>
        <div class="mb-8">
          {modules.map((module, i) => (
            <GfxCard module={module} index={i}></GfxCard>
          ))}
        </div>
      </Article>
    </Layout>
  );
}

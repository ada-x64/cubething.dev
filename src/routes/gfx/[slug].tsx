import { Handlers, PageProps } from "$fresh/server.ts";
import Markdown from "@/components/article/Markdown.tsx";
import { TwClass } from "@/deps/styles.ts";
import { getGfxModule, GfxModule } from "@/deps/gfx-module.ts";
import GfxCanvas from "@/islands/GfxCanvas.tsx";
import Title from "@/components/layout/Title.tsx";
import Layout from "@/components/layout/Layout.tsx";
import MainContent from "@/components/layout/MainContent.tsx";
import Footer from "@/components/layout/Footer.tsx";
import CdnTime from "@/components/layout/CdnTime.tsx";

export const handler: Handlers<GfxModule> = {
  async GET(_req, ctx) {
    const post = await getGfxModule(ctx.params.slug);
    return post === null ? ctx.renderNotFound() : ctx.render(post);
  },
};

export default function GfxPage(props: PageProps<GfxModule>) {
  const module = props.data;
  console.log(module);

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
        <CdnTime
          inline={false}
          lastCommit={module.lastCommit}
          publishedAt={module.publishedAt}
        />
        <GfxCanvas module={module} />
        <Markdown title={module.title} content={module.textContent} />
        <Footer />
      </MainContent>
    </Layout>
  );
}

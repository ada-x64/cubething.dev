import Layout from "@/components/layout/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import Markdown from "@/components/article/Markdown.tsx";
import Contact from "@/components/layout/Contact.tsx";
import Article from "@/components/article/Article.tsx";
import { CDN_URL } from "@/deps/paths.ts";

export const handler: Handlers<string> = {
  async GET(_req, ctx) {
    const articleResp = await fetch(CDN_URL + "/about/index.md");
    const article = await articleResp.text();
    return ctx.render(article);
  },
};

export default function About(props: PageProps<string>) {
  return (
    <Layout title="about" route={props.route}>
      <Article title="about" route={props.route}>
        <Contact />
        <Markdown title="about" content={props.data} />
      </Article>
    </Layout>
  );
}

import Layout from "@/components/layout/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/deps/posts.ts";
import PostCard from "@/components/pageComponent/PostCard.tsx";
import { BorderColor, OutboundLink, TwClass } from "@/deps/styles.ts";
import { getGfxModules, GfxModule } from "@/deps/gfx-module.ts";
import GfxCard from "@/components/pageComponent/GfxCard.tsx";
import Article from "@/components/pageComponent/Article.tsx";
import ArticleBlurb from "@/components/pageComponent/ArticleBlurb.tsx";

type Props = {
  posts: Post[];
  gallery: GfxModule[];
};

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const posts = await getPosts(3);
    const gallery = await getGfxModules(3);
    return ctx.render({ posts, gallery });
  },
};

export default function Index(props: PageProps<Props>) {
  const h2Class = TwClass([
    "text-xl",
    "font-header",
    "text-center",
    BorderColor,
    "border-t-1",
    "mt-4",
    "pt-4",
    OutboundLink,
  ]);

  return (
    <Layout title={"cubething"} route={props.route}>
      <Article title="cubething" route={props.route}>
        <ArticleBlurb>
          This is the personal website of{" "}
          <a
            title="about"
            href="/about"
            class={TwClass([OutboundLink, "inline-block"])}
          >
            Ada Mandala.
          </a>{" "}
          On this site you'll find experiments in web graphics and articles
          about various topics.
        </ArticleBlurb>
        <a href="/gfx" title="gfx">
          <h2 class={h2Class}>{"< gfx />"}</h2>
        </a>
        <div id="gfx-gallery">
          {props.data.gallery.map((module, i) => (
            <GfxCard module={module} index={i} />
          ))}
        </div>
        <a href="/articles" title="articles">
          <h2 class={h2Class}>{"< articles />"}</h2>
        </a>
        <div id="articles">
          {props.data.posts.map((post) => <PostCard post={post} />)}
        </div>
      </Article>
    </Layout>
  );
}

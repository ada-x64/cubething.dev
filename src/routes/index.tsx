import Layout from "@/components/layout/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPostMetadata, PostMetadata } from "@/deps/posts.ts";
import PostCard from "@/components/article/PostCard.tsx";
import { BorderColor, OutboundLink, TwClass } from "@/deps/styles.ts";
import { getGfxModuleMetadata, GfxModuleMetadata } from "@/deps/gfx-module.ts";
import GfxCard from "@/components/gfx/GfxCard.tsx";
import Article from "@/components/article/Article.tsx";
import ArticleBlurb from "@/components/article/ArticleBlurb.tsx";

type Props = {
  posts: PostMetadata[];
  gallery: GfxModuleMetadata[];
};

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const posts = await getPostMetadata(3);
    const gallery = await getGfxModuleMetadata(3);
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
          {props.data.posts.map((post) => (
            <PostCard post={post}></PostCard>
          ))}
        </div>
      </Article>
    </Layout>
  );
}

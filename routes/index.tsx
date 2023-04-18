import Layout from "@/components/layout/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/deps/posts.ts";
import PostCard from "@/components/pageComponent/PostCard.tsx";
import { OutboundLink, TwClass } from "@/deps/styles.ts";
import { getGfxModules, GfxModule } from "@/deps/gfx-module.ts";
import GfxCard from "@/components/pageComponent/GfxCard.tsx";

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
  return (
    <Layout title={"cubething"} route={props.route}>
      <div>
        <div class={TwClass(["mb-8", "text-center"])}>
          This is the personal website of{" "}
          <a title="about" href="/about" class={OutboundLink}>
            Phoenix Ada Rose Mandala
          </a>
          .
        </div>
        <h2 class="text-2xl font-header text-center">
          <a href="/gfx" title="gfx" class={OutboundLink}>
            recent gfx
          </a>
        </h2>
        <div class="mb-8" id="gfx-gallery">
          {props.data.gallery.map((module, i) => (
            <GfxCard module={module} index={i} />
          ))}
        </div>
        <h2 class="text-2xl font-header text-center">
          <a href="/articles" title="articles" class={OutboundLink}>
            recent articles
          </a>
        </h2>
        <div class="mb-8" id="articles">
          {props.data.posts.map((post) => <PostCard post={post} />)}
        </div>
      </div>
    </Layout>
  );
}

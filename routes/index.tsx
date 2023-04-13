import Layout from "@/components/layout/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/deps/posts.ts";
import PostCard from "@/components/pageComponent/PostCard.tsx";
import { OutboundLink } from "@/deps/styles.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts(3);
    // const gallery = await getGallery(3);
    return ctx.render(posts);
  },
};

export default function Index(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <Layout title={"cubething"} route={props.route}>
      <div>
        <div class="mb-8">
          This is the personal website of{" "}
          <a title="about" href="/about" class={OutboundLink}>
            Phoenix Ada Rose Mandala
          </a>
          .
        </div>
        {
          /*
        <h2 class="text-3xl font-header text-center">
          <a href="gfx/about" title="gfx" class={OutboundLink}>
            recent gfx
          </a>
        </h2>
        <div class="mb-8" id="gfx-gallery">
          {gallery.map((item) => <GalleryItem item={thumbnail} />)}
        </div>
          */
        }
        <h2 class="text-3xl font-header text-center">
          <a href="archive" title="archive" class={OutboundLink}>
            recent posts
          </a>
        </h2>
        <div class="mb-8" id="articles">
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      </div>
    </Layout>
  );
}

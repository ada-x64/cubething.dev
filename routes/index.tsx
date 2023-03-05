import Layout from "@/components/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/models/posts.ts";
import PostCard from "@/components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts(3);
    return ctx.render(posts);
  },
};

export default function Index(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <Layout route={props.route}>
      <div>
        <div class="mb-8">
          This is the personal website of{" "}
          <a
            class="underline decoration-rose-500 decoration-wavy decoration-from-font"
            title="about"
            href="/about"
          >
            Phoenix Ada Rose Mandala.
          </a>
        </div>
        <h2 class="text-3xl font-header text-center">Recent Posts</h2>
        <div class="mb-8" id="articles">
          {posts.map((post) => <PostCard post={post}></PostCard>)}
        </div>
      </div>
    </Layout>
  );
}

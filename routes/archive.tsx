import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/deps/posts.ts";
import Layout from "@/components/Layout.tsx";
import PostCard from "@/components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function Archive(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <Layout title={"archive"} route={props.route}>
      <div>
        This page contains an archive of all my past blog posts. Topics
        discussed include web development, game development, philosophy, and
        mathematics.
      </div>
      <div class="mb-8">
        {posts.map((post) => <PostCard post={post}></PostCard>)}
      </div>
    </Layout>
  );
}

import Layout from "@/components/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
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
        <h2 class="text-3xl">Recent Posts</h2>
        <div class="mb-8" id="articles">
          {posts.map((post) => <PostCard post={post}></PostCard>)}
 
        </div>
      </div>
    </Layout>
  );
}

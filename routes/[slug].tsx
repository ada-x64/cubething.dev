import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "@/utils/posts.ts";
import Layout from "@/components/Layout.tsx";
import Markdown from "@/components/Markdown.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    return post === null ? ctx.renderNotFound() : ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Layout route={`/${props.data.title}`}>
        <time class="block text-gray-500 text-right">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <Markdown content={post.content} />
      </Layout>
    </>
  );
}

import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, getTime, Post } from "@/deps/posts.ts";
import Layout from "@/components/Layout.tsx";
import Markdown from "@/components/Markdown.tsx";
import { TwClass } from "@/deps/styles.ts";

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
      <Layout title={post.title} route={`${props.route}`}>
        <time
          class={TwClass([
            "block",
            "text-gray-500",
            "text-center",
            "-mt-2",
            "mb-2",
          ])}
        >
          {getTime(post.mtime)}
        </time>
        <Markdown title={post.title} content={post.content} />
      </Layout>
    </>
  );
}

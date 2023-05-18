import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "@/deps/posts.tsx";
import Layout from "@/components/layout/Layout.tsx";
import Markdown from "@/components/article/Markdown.tsx";
import { TimeStyle, TwClass } from "@/deps/styles.ts";
import Article from "@/components/article/Article.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    console.log("params:", ctx.params);
    const post = await getPost(ctx.params.slug, ctx.params);
    return post === null ? ctx.renderNotFound() : ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  let time;
  console.log(post);

  return (
    <Layout title={post.metadata.title} route={props.route}>
      <Article title={post.metadata.title} route={props.route}>
        {post.metadata.getTime(false)}
        <Markdown title={post.metadata.title} content={post.content} />
      </Article>
    </Layout>
  );
}

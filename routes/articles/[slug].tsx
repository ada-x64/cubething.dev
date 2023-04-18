import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "@/deps/posts.ts";
import { getTime } from "@/deps/time.ts";
import Layout from "@/components/layout/Layout.tsx";
import Markdown from "@/components/pageComponent/Markdown.tsx";
import { TimeStyle, TwClass } from "@/deps/styles.ts";
import Article from "@/components/pageComponent/Article.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    return post === null ? ctx.renderNotFound() : ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <Layout title={post.title} route={props.route}>
      <Article title={post.title} route={props.route}>
        <time class={TwClass([TimeStyle, "text-center", "-mt-2", "mb-2"])}>
          {getTime(post.mtime)}
        </time>
        <Markdown title={post.title} content={post.content} />
      </Article>
    </Layout>
  );
}

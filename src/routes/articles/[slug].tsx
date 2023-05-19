import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "@/cdn/posts.ts";
import Layout from "@/components/layout/Layout.tsx";
import Markdown from "@/components/article/Markdown.tsx";
import Article from "@/components/article/Article.tsx";
import CdnTime from "@/components/layout/CdnTime.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    return post === null ? ctx.renderNotFound() : ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <Layout title={post.metadata.title} route={props.route}>
      <Article title={post.metadata.title} route={props.route}>
        <CdnTime
          inline={false}
          publishedAt={post.metadata.publishedAt}
          lastCommit={post.metadata.lastCommit}
        />
        <Markdown title={post.metadata.title} content={post.content} />
      </Article>
    </Layout>
  );
}

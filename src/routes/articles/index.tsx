import { Handlers, PageProps } from "$fresh/server.ts";
import { getPostMetadata, PostMetadata } from "@/cdn/posts.ts";
import Layout from "@/components/layout/Layout.tsx";
import PostCard from "@/components/article/PostCard.tsx";
import Article from "@/components/article/Article.tsx";
import ArticleBlurb from "@/components/article/ArticleBlurb.tsx";

export const handler: Handlers<PostMetadata[]> = {
  async GET(_req, ctx) {
    const posts = await getPostMetadata();
    return ctx.render(posts);
  },
};

export default function Archive(props: PageProps<PostMetadata[]>) {
  const posts = props.data;
  return (
    <Layout title={"articles"} route={props.route}>
      <Article title="articles" route={props.route}>
        <ArticleBlurb>
          This page contains an archive of all my past blog posts. Topics
          discussed include web development, game development, philosophy, and
          mathematics.
        </ArticleBlurb>
        <div class="mb-8">
          {posts.map((post) => (
            <PostCard post={post}></PostCard>
          ))}
        </div>
      </Article>
    </Layout>
  );
}

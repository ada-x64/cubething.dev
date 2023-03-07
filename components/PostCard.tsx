import { getTime, Post } from "@/deps/posts.ts";
import { TwClass } from "@/deps/styles.ts";
import { BorderColor } from "@/deps/styles.ts";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class={TwClass(["mt-4", "pt-4", "border-t", BorderColor])}>
      <a href={`/articles/${post.slug}`}>
        <h3>{post.title}</h3>
        <time class="text-zinc-500 font-normal">{getTime(post.mtime)}</time>
        <div class="mt-4 text-zinc-900 dark:text-zinc-100 font-normal">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}

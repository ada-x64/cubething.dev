import { getTime, Post } from "@/models/posts.ts";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8 border(t zinc-200)">
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <h3 class="text(1xl zinc-900 dark:zinc-100) font-bold">{post.title}</h3>
        <time class="text-zinc-500">{getTime(post.mtime)}</time>
        <div class="mt-4 text-zinc-900 dark:text-zinc-100">{post.snippet}</div>
      </a>
    </div>
  );
}

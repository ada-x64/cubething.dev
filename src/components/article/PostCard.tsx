import { PostMetadata } from "@/deps/posts.tsx";
import { formatTime } from "@/deps/time.ts";
import { OutboundLink, TimeStyle, TwClass } from "@/deps/styles.ts";
import { BorderColor } from "@/deps/styles.ts";

export default function PostCard(props: { post: PostMetadata }) {
  const { post } = props;

  const hoverStyle = OutboundLink.split(" ")
    .map((s) =>
      s.startsWith("hover:")
        ? `hover:[&_h3]:${s.replace("hover:", "")}`
        : `[&_h3]:${s}`
    )
    .join(" ");

  return (
    <div class={TwClass(["mt-4", "pt-4", "border-t", BorderColor])}>
      <a href={`/articles/${post.slug}`}>
        <div class={hoverStyle} tabIndex={0}>
          <h3 class={"text-lg font-header font-bold"}>{post.title}</h3>
          {post.getTime(true)}
          <div class="mt-4 font-normal">{post.snippet}</div>
        </div>
      </a>
    </div>
  );
}

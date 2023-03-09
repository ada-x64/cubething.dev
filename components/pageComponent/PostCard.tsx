import { getTime, Post } from "@/deps/posts.ts";
import { OutboundLink, Palette, TimeStyle, TwClass } from "@/deps/styles.ts";
import { BorderColor } from "@/deps/styles.ts";

export default function PostCard(props: { post: Post }) {
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
          <time class={TwClass([TimeStyle, "text-sm"])}>
            {getTime(post.mtime)}
          </time>
          <div class="mt-4 font-normal">{post.snippet}</div>
        </div>
      </a>
    </div>
  );
}

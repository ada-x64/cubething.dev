import { TwClass, TimeStyle } from "@/deps/styles.ts";

export function formatTime(mtime: Date | null) {
  if (mtime !== null) {
    return mtime.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    return null;
  }
}

export default function getTime({
  inline,
  publishedAt,
  lastCommit,
}: {
  inline: boolean;
  publishedAt: Date;
  lastCommit: Date;
}) {
  let style = TwClass([TimeStyle]);
  if (inline) {
    style = TwClass([style, "text-sm"]);
  } else {
    style = TwClass([style, "text-center", "-mt-2", "mb-2"]);
  }

  let time;
  if (publishedAt !== lastCommit) {
    time = (
      <>
        First published {formatTime(publishedAt)}
        {(() => {
          if (!inline) {
            return <br />;
          } else {
            return " | ";
          }
        })()}
        Updated {formatTime(lastCommit)}
      </>
    );
  } else {
    time = <>{formatTime(publishedAt)}</>;
  }

  return <time class={style}> {time}</time>;
}

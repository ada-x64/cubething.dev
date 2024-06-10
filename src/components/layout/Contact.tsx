import { BorderColor, OutboundLink, TwClass } from "@/deps/styles.ts";
import { CDN_URL } from "@/deps/paths.ts";

export default function Contact() {
  return (
    <address
      class={TwClass([
        "flex",
        "justify-around",
        "not-italic",
        "border-b",
        "pb-4",
        "mb-4",
        BorderColor,
      ])}
    >
      <a
        href={CDN_URL + "/about/resume.pdf"}
        target="_blank"
        title="open resume in new tab"
        class={TwClass([OutboundLink])}
      >
        resume
      </a>
      {/* <a
        href="https://hachyderm.io/@cubething"
        rel="me"
        class={TwClass([OutboundLink])}
      >
        mastodon
      </a> */}
      <a
        href="https://www.linkedin.com/in/ada-mandala/"
        title="open linkedin in new tab"
        target="_blank"
        class={TwClass([OutboundLink])}
      >
        linkedin
      </a>
      <a
        href="https://github.com/ada-x64"
        title="open github in new tab"
        target="_blank"
        class={TwClass([OutboundLink])}
      >
        github
      </a>
    </address>
  );
}

import { BorderColor, OutboundLink, TwClass } from "@/deps/styles.ts";

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
        href="/doc/resume.pdf"
        target="_blank"
        title="open resume in new tab"
        class={TwClass([OutboundLink])}
      >
        resume
      </a>
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

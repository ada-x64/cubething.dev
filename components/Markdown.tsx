import { Head } from "$fresh/src/runtime/head.ts";
import { render } from "$gfm";

export function Markdown({ css, content }: { css: string; content: string }) {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: css }}></style>
      </Head>
      <div
        data-color-mode="auto"
        data-light-theme="light"
        data-dark-theme="dark"
        class="mt-8 markdown-body"
        dangerouslySetInnerHTML={{ __html: render(content) }}
      >
      </div>
    </>
  );
}

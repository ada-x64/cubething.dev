import { render } from "$gfm";
import Layout from "@/components/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<string> = {
  async GET(_req, ctx) {
    const data = await Deno.readTextFile("./data/about.md");
    const md = render(data);
    return ctx.render(md);
  },
};

export default function About(props: PageProps<string>) {
  return (
    <Layout route={props.route}>
      <div
        class="mt-8 markdown-body"
        dangerouslySetInnerHTML={{ __html: props.data }}
      >
      </div>
    </Layout>
  );
}

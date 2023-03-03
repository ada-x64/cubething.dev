import Layout from "@/components/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import Markdown from "@/components/Markdown.tsx";
import { DataPath } from "@/deps/paths.ts";
import { join } from "$std/path/mod.ts";

export const handler: Handlers<string> = {
  async GET(_req, ctx) {
    const data = await Deno.readTextFile(join(DataPath, "about.md"));
    return ctx.render(data);
  },
};

export default function About(props: PageProps<string>) {
  return (
    <Layout route={props.route}>
      <Markdown content={props.data} />
    </Layout>
  );
}

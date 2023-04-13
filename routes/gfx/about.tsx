import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "@/components/layout/Layout.tsx";
import { join } from "$std/path/mod.ts";
import { DataPath } from "@/deps/paths.ts";
import Markdown from "@/components/pageComponent/Markdown.tsx";

export const handler: Handlers<string> = {
  async GET(_req, ctx) {
    const data = await Deno.readTextFile(join(DataPath, "about_gfx.md"));
    return ctx.render(data);
  },
};
export default function AboutGfx(props: PageProps<string>) {
  return (
    <Layout title="gfx/about" route={props.route}>
      <Markdown title="about" content={props.data} />
    </Layout>
  );
}

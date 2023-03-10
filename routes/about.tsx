import Layout from "@/components/layout/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import Markdown from "@/components/pageComponent/Markdown.tsx";
import { DataPath } from "@/deps/paths.ts";
import { join } from "$std/path/mod.ts";
import Contact from "@/components/pageComponent/Contact.tsx";

export const handler: Handlers<string> = {
  async GET(_req, ctx) {
    const data = await Deno.readTextFile(join(DataPath, "about.md"));
    return ctx.render(data);
  },
};

export default function About(props: PageProps<string>) {
  return (
    <Layout title="about" route={props.route}>
      <Contact />
      <Markdown title="about" content={props.data} />
    </Layout>
  );
}

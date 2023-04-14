import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "@/components/layout/Layout.tsx";
import { getGfxModules, GfxModule } from "@/deps/gfx-module.ts";
import GfxCard from "@/components/pageComponent/GfxCard.tsx";
import { OutboundLink } from "../deps/styles.ts";

export const handler: Handlers<GfxModule[]> = {
  async GET(_req, ctx) {
    const modules = await getGfxModules();
    return ctx.render(modules);
  },
};

export default function Archive(props: PageProps<GfxModule[]>) {
  const modules = props.data;
  return (
    <Layout title={"gallery"} route={props.route}>
      <div>
        This page contains a listing of all my previous graphics showcases. The
        graphics on this page are largely developed with{" "}
        <a href="https://github.com/ada-x64/sundile_rs" class={OutboundLink}>
          Sundile
        </a>
        , my game engine.
      </div>
      <div class="mb-8">
        {modules.map((module, i) => (
          <GfxCard module={module} index={i}></GfxCard>
        ))}
      </div>
    </Layout>
  );
}

import { Head } from "$fresh/src/runtime/head.ts";

export default function Title({ route }: { route: string }) {
  const sliced = route.slice(1);
  const title = sliced.length > 0 ? sliced.toLowerCase() : "cubething";
  return (
    <>
      <h1
        id="header"
        class="text-center py-4 mb-[0.5em] font-bold font-header text-rose-500 dark:text-amber-500 lowercase sticky top-0 self-start transition-all ease-linear border-b border-zinc-700 dark:bg-zinc-900 bg-white w-full z-50"
        style="font-size: 2.25rem; line-height:2.5rem;"
      >
        <button
          title={`${title} - go to top`}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          {`< ${title} />`}
        </button>
      </h1>
    </>
  );
}

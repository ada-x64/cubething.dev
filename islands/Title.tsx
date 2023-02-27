window.onscroll = () => {
  const header = document.getElementById("header");
  const homeBtn = document.getElementById("homeBtn");
  const themeBtn = document.getElementById("themeBtn");
  // if (window.scrollY > 50) {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    header!.classList.replace("text-4xl", "text-3xl");
    homeBtn!.classList.replace("text-4xl", "text-3xl");
    themeBtn!.classList.replace("text-4xl", "text-3xl");
  } else {
    header!.classList.replace("text-3xl", "text-4xl");
    homeBtn!.classList.replace("text-3xl", "text-4xl");
    themeBtn!.classList.replace("text-3xl", "text-4xl");
  }
};

export default function Title({ route }: { route: string }) {
  const sliced = route.slice(1);
  const title = sliced.length > 0 ? sliced : "cubething";
  return (
    <h1
      id="header"
      class="text-4xl text-center py-4 mb-[0.5em] font-bold font-header text-rose-500 dark:text-amber-500 lowercase sticky top-0 self-start transition-all ease-linear border-b border-zinc-700 dark:bg-zinc-900 bg-white w-full z-50"
    >
      {`< ${title} />`}
    </h1>
  );
}

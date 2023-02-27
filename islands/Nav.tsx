import Cube from "@/components/svg/Cube.svg.tsx";

export const navigation = [
  {
    name: "about",
    href: "/about",
  },
  {
    name: "archive",
    href: "/archive",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav({ route }: { route: string }) {
  return (
    <>
      <nav class="h-auto w-24 px-4 text-xl font-sans pt-4 sticky top-0 self-start">
        <div class="flex items-center">
          <div class="flex flex-col items-center justify-center">
            <div
              class="flex flex-col flex-shrink-0 items-center pb-4 mb-4 border-b border-zinc-700 w-full text-4xl transition-all ease-linear"
              id="homeBtn"
            >
              <a href="/">
                <Cube />
              </a>
            </div>
            <div class="">
              <div class="flex flex-col">
                {navigation.map((item) => {
                  const current = item.href === route;
                  return (
                    <a
                      key={item.name}
                      href={current ? "#" : item.href}
                      class={classNames(
                        current
                          ? "text-white bg-zinc-900 outline-2"
                          : "text-white hover:outline-2 hover:outline-offset-4 hover:outline-white",
                        "px-2 py-1 mb-1 rounded-sm text-sm font-medium text-center",
                      )}
                      aria-current={current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

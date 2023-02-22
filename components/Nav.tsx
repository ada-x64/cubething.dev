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
      <nav class="h-auto w-24 px-4 bg-zinc-700 text-xl font-sans pt-8">
        <div class="flex items-center">
          <div class="flex flex-col items-center justify-center">
            <div class="flex flex-col flex-shrink-0 items-center pb-8">
              <a href="/">
                {
                  /*
                TODO: Replace this with a webgl cube that spins on hover.
              */
                }
                <Cube size={48} />
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

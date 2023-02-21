export const navigation = [
  {
    name: "about",
    href: "/about",
    current: false,
  },
  {
    name: "contact",
    href: "/contact",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  return (
    <>
      <nav class="h-screen w-24 px-4 bg-zinc-900 dark:bg-zinc-700 text-xl font-sans pt-8">
        <div class="flex items-center">
          <div class="flex flex-col items-center justify-center">
            <div class="flex flex-col flex-shrink-0 items-center pb-8">
              <a href="/">
                {
                  /*
                TODO: Replace this with a webgl cube that spins on hover.
              */
                }
                <img class="w-auto" src="3d-cube.png" alt="cubething.dev" />
              </a>
            </div>
            <div class="">
              <div class="flex flex-col">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    class={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

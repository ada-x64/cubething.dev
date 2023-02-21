import { Head } from "$fresh/src/runtime/head.ts";

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
      <Head>
        <link rel="stylesheet" href="style/cube.css" />
      </Head>
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
                <svg
                  viewBox="-3 -3 106 106"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                >
                  <polygon points="50,50 10,25 50,0 90,25"></polygon>
                  <polygon points="50,50 10,25 10,75 50,100"></polygon>
                  <polygon points="50,50 90,25 90,75 50,100"></polygon>
                </svg>
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

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

export default function Header() {
  return (
    <>
      <nav class="absolute h-screen w-24 px-4 bg-gray-900 text-xl font-sans pt-8">
        <div class="flex items-center">
          {/* MOBILE - TODO */}
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* LOGO - TODO*/}
            <div className="flex flex-col flex-shrink-0 items-center pb-8">
              <a href="/">
                {
                  /*
                TODO: Replace this with a webgl cube that spins on hover.
              */
                }
                <img className="w-auto" src="3d-cube.png" alt="cubething.dev" />
              </a>
            </div>
            <div className="">
              <div className="flex flex-col">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
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

import HomeBtn from "@/islands/HomeBtn.tsx";
import Sidebar from "@/components/Sidebar.tsx";

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
    <Sidebar
      order={1}
      id={"main-nav"}
      ariaLabel={"main-nav"}
      icon={<HomeBtn />}
      justify="right"
    >
      {navigation.map((item) => {
        const current = item.href === route;
        return (
          <a
            key={item.name}
            href={current ? "#" : item.href}
            title={item.name}
            tabIndex={0}
            class={classNames(
              current
                ? "text-white bg-zinc-700 outline-2"
                : "text-zinc-900 dark:text-zinc-300 dark:hover:text-amber-500 hover:text-rose-500",
              "px-2 py-1 mb-1 rounded-sm text-sm font-medium text-center transition",
            )}
            aria-current={current ? "page" : undefined}
          >
            {item.name}
          </a>
        );
      })}
    </Sidebar>
  );
}

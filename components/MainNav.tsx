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
    <Sidebar order={1} ariaLabel={"main"} icon={HomeBtn}>
      {navigation.map((item) => {
        const current = item.href === route;
        return (
          <a
            key={item.name}
            href={current ? "#" : item.href}
            tabIndex={0}
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
    </Sidebar>
  );
}

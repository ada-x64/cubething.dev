import HomeBtn from "@/islands/HomeBtn.tsx";
import Sidebar, {
  ItemSelectableStyle,
  ItemSelectedStyle,
  ItemStyle,
} from "@/components/Sidebar.tsx";

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

export default function MainNav({ route }: { route: string }) {
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
        const classes = [
          current ? ItemSelectedStyle : ItemSelectableStyle,
          ItemStyle,
        ].join(" ");
        return (
          <a
            key={item.name}
            href={current ? "#" : item.href}
            title={item.name}
            tabIndex={0}
            class={classes}
            aria-current={current ? "page" : undefined}
          >
            {item.name}
          </a>
        );
      })}
    </Sidebar>
  );
}

import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import Sidebar, {
  ItemSelectableStyle,
  ItemStyle,
} from "@/components/Sidebar.tsx";

export const navigation = [
  {
    name: "top",
    href: "#",
  },
];

export default function ArticleNav() {
  return (
    <Sidebar
      order={3}
      id="article-nav"
      ariaLabel="article-nav"
      icon={<DarkModeToggle />}
      justify="left"
    >
      {navigation.map((item) => {
        const classes = [ItemSelectableStyle, ItemStyle].join(" ");

        return (
          <a
            key={item.name}
            href={item.href}
            title={item.name}
            tabIndex={0}
            class={classes}
          >
            {item.name}
          </a>
        );
      })}
    </Sidebar>
  );
}

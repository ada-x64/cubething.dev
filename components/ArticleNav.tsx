import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import Sidebar, {
  ItemSelectableStyle,
  ItemStyle,
} from "@/components/Sidebar.tsx";

type tNav = { name: string; href: string }[];

export const article_nav: tNav = [
  {
    name: "top",
    href: "#",
  },
];

export const all_nav: tNav = [];

const classes = [ItemSelectableStyle, ItemStyle].join(" ");

export default function ArticleNav({ route }: { route: string }) {
  let navigation = all_nav;
  if (route.includes("articles")) {
    navigation = navigation.concat(article_nav);
  }

  return (
    <Sidebar
      order={3}
      id="article-nav"
      ariaLabel="article-nav"
      icon={<DarkModeToggle />}
      justify="left"
    >
      {navigation.map((item) => {
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

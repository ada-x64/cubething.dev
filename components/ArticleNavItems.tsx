import { tNav } from "@/deps/types.ts";
import { ItemListStyle, ItemStyle } from "@/deps/styles.ts";
import { closeMobileNav } from "@/islands/MobileNav.tsx";

export function ArticleNavItems({
  navigation,
  route,
}: {
  navigation: tNav;
  route: string;
}) {
  const articleNav: tNav = [
    {
      name: "top",
      href: "#",
    },
  ];
  if (route.includes("articles")) {
    navigation = navigation.concat(articleNav);
  }
  const items = navigation.map((item) => {
    return (
      <a
        key={item.name}
        href={item.href}
        title={item.name}
        tabIndex={0}
        class={ItemStyle}
        onClick={closeMobileNav}
      >
        {item.name}
      </a>
    );
  });
  return <div class={ItemListStyle}>{items}</div>;
}

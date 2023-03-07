import { tNav } from "@/components/ArticleNav.tsx";
import { ItemListStyle, ItemSelectedStyle, ItemStyle } from "@/deps/styles.ts";

export function MainNavItems({
  navigation,
  route,
}: {
  navigation: tNav;
  route: string;
}) {
  const items = navigation.map((item) => {
    const current = item.href === route;
    if (current) {
      return (
        <div class={[ItemStyle, ItemSelectedStyle].join(" ")}>{item.name}</div>
      );
    } else {
      return (
        <a
          key={item.name}
          href={current ? "#" : item.href}
          title={item.name}
          tabIndex={0}
          class={ItemStyle}
          aria-current={current ? "page" : undefined}
        >
          {item.name}
        </a>
      );
    }
  });
  return <div class={ItemListStyle}>{items}</div>;
}

import { tNav } from "@/components/ArticleNav.tsx";
import { ItemListStyle, ItemStyle } from "@/deps/styles.ts";

export function ArticleNavItems({ navigation }: { navigation: tNav }) {
  const items = navigation.map((item) => {
    return (
      <a
        key={item.name}
        href={item.href}
        title={item.name}
        tabIndex={0}
        class={ItemStyle}
      >
        {item.name}
      </a>
    );
  });
  return <div class={ItemListStyle}>{items}</div>;
}

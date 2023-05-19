import { tNav } from "@/deps/nav.ts";
import { InboundLink, ItemListStyle, ItemStyle } from "@/deps/styles.ts";
import { closeMobileNav } from "@/islands/MobileNav.tsx";

export function ArticleNavItems({ navigation }: { navigation: tNav }) {
  const items = navigation.map((item) => {
    return (
      <a
        key={item.name}
        href={item.href}
        title={item.name}
        tabIndex={0}
        class={ItemStyle.concat(InboundLink)}
        onClick={closeMobileNav}
      >
        {item.name}
      </a>
    );
  });
  return <div class={ItemListStyle}>{items}</div>;
}

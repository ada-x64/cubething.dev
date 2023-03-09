import { tNav } from "@/deps/types.ts";
import {
  ItemListStyle,
  ItemSelectedStyle,
  ItemStyle,
  OutboundLink,
  TwClass,
} from "@/deps/styles.ts";
import { closeMobileNav } from "@/islands/MobileNav.tsx";

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
          class={TwClass([ItemStyle, OutboundLink])}
          aria-current={current ? "page" : undefined}
          onClick={closeMobileNav}
        >
          {item.name}
        </a>
      );
    }
  });
  return <div class={ItemListStyle}>{items}</div>;
}

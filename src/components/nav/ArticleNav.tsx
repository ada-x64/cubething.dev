import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import Sidebar from "@/components/nav/Sidebar.tsx";
import { ArticleNavItems } from "@/components/nav/ArticleNavItems.tsx";
import { articleNav, tNav } from "@/deps/nav.ts";

export const allNav: tNav = [];

export default function ArticleNav({ route }: { route: string }) {
  let navigation = allNav;
  if (route.includes("articles")) {
    navigation = navigation.concat(articleNav);
  }

  return (
    <Sidebar
      order={3}
      id="article-nav"
      ariaLabel="article-nav"
      icon={<DarkModeToggle />}
      justify="left"
    >
      <ArticleNavItems navigation={navigation} />
    </Sidebar>
  );
}

import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import { ArticleNavItems } from "@/components/ArticleNavItems.tsx";
import { tNav } from "@/deps/types.ts";

export const allNav: tNav = [];

export default function ArticleNav({ route }: { route: string }) {
  return (
    <Sidebar
      order={3}
      id="article-nav"
      ariaLabel="article-nav"
      icon={<DarkModeToggle />}
      justify="left"
    >
      <ArticleNavItems navigation={allNav} route={route} />
    </Sidebar>
  );
}

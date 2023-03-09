import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import { ArticleNavItems } from "@/components/ArticleNavItems.tsx";

export const articleNav: tNav = [
  {
    name: "top",
    href: "#",
  },
];

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

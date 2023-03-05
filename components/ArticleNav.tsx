import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import Sidebar from "@/components/Sidebar.tsx";

export default function ArticleNav() {
  return (
    <Sidebar
      order={3}
      id="article-nav"
      ariaLabel="article-nav"
      icon={<DarkModeToggle />}
    >
      {""}
    </Sidebar>
  );
}

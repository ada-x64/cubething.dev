import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import Sidebar from "@/components/Sidebar.tsx";

export default function ArticleNav() {
  return (
    <Sidebar order={3} ariaLabel="article" icon={DarkModeToggle}>
      {"todo"}
    </Sidebar>
  );
}

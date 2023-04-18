import HomeBtn from "@/components/nav/HomeBtn.tsx";
import Sidebar from "@/components/nav/Sidebar.tsx";
import { MainNavItems } from "@/components/nav/MainNavItems.tsx";
import { mainNav } from "@/deps/nav.ts";

export default function MainNav({ route }: { route: string }) {
  return (
    <Sidebar
      order={1}
      id={"main-nav"}
      ariaLabel={"main-nav"}
      icon={<HomeBtn />}
      justify="right"
    >
      <MainNavItems navigation={mainNav} route={route} />
    </Sidebar>
  );
}

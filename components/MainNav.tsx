import HomeBtn from "@/components/HomeBtn.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import { tNav } from "@/deps/types.ts";
import { MainNavItems } from "@/components/MainNavItems.tsx";

export const navigation: tNav = [
  {
    name: "about",
    href: "/about",
  },
  {
    name: "archive",
    href: "/archive",
  },
];

export default function MainNav({ route }: { route: string }) {
  return (
    <Sidebar
      order={1}
      id={"main-nav"}
      ariaLabel={"main-nav"}
      icon={<HomeBtn />}
      justify="right"
    >
      <MainNavItems navigation={navigation} route={route} />
    </Sidebar>
  );
}

import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { BookMarked } from "lucide-react";
import { useAuth } from "@/contexts/AuthContextHandler";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { username } = useAuth();
  const navigate = useNavigate();
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" isBordered={true}>
      <NavbarContent className="basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <div className="flex flex-row items-center gap-1">
              <BookMarked size={20} className="mt-1" />
              <p className="font-bold">Swappy books</p>
            </div>
          </Link>
        </NavbarBrand>

        {/* Navigazione sempre visibile */}
        <div className="flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="basis-full" justify="end">
        <NavbarItem className="flex gap-2">
          <ThemeSwitch />
          {!username ? (
            <Button color="primary" size="sm" onPress={() => {
              navigate("/login");
            }}>Login</Button>
          ) : username}
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
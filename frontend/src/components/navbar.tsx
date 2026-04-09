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
import { addToast, Button } from "@heroui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "@/misc/api";

export const Navbar = () => {
  const { username } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, setUsername } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

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
        <div className="flex gap-4 justify-start ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "flex items-center gap-1 transition-all hover:opacity-70",
                  isActive(item.href) && "bg-blue-900/60 border border-blue-400/40 rounded-lg px-3 py-1",
                )}
                color="foreground"
                href={item.href}
              >
                {/* Render dell'icona dinamica */}
                {item.icon && <item.icon size={18} strokeWidth={2} />}
                <span className="text-sm">{item.label}</span>
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
          ) : (
            <div className="flex flex-row items-center gap-3">
              {username}
              <Button
                size="sm" color="danger" variant="light"
                onPress={async () => {
                  const response = await logout();
                  addToast(
                    {
                      title: response.message,
                      color: response.successful === true ? "success" : "danger"
                    }
                  );
                  if (response.successful === true) {
                    setUsername("");
                    setIsAuthenticated(false);
                  }
                }}>
                Logout
              </Button>
            </div>

          )}
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { motion } from "framer-motion";

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
        <div className="flex gap-1 justify-start ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className="relative px-3 py-1.5 flex items-center gap-1.5 text-sm font-medium"
                color="foreground"
                href={item.href}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-default-200 dark:bg-default-600/30 rounded-lg shadow-sm shadow-black/5 dark:shadow-black/20 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  />
                )}
                {item.icon && <item.icon size={16} strokeWidth={2} />}
                <span className="relative z-10">{item.label}</span>
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
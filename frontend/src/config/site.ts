import { BookOpen, Heart, Home, MessageSquare, ShoppingBag } from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Swappy books",
  description: "This is a platform to buy and sell used books.",
  navItems: [
    {
      label: "Home",
      href: "/",
      icon: Home,
      authRequired:false
    },
    {
      label: "Messages",
      href: "/messages",
      icon: MessageSquare,
      authRequired:true
    },
    {
      label: "Shop",
      href: "/shop",
      icon: ShoppingBag,
      authRequired:false
    },
    {
      label: "Favorites",
      href: "/favorites",
      icon: Heart,
      authRequired:true
    },
    {
      label: "Your swaps",
      href: "/swaps",
      icon: BookOpen,
      authRequired:true
    }
    
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "Your swaps",
      href: "/swaps",
    },
    {
      label: "Messages",
      href: "/messages",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

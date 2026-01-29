export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Swappy books",
  description: "This is a platform to buy and sell used books.",
  navItems: [
    {
      label: "Home",
      href: "/",
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

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  const pathname = usePathname();

  const tabs = [
    { label: "Feed", icon: HomeIcon, href: "/" },
    { label: "Newpost", icon: CalendarIcon, href: "/Newpost" },
    { label: "Profile", icon: UserIcon, href: "/Profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-amber-400 text-amber-100 shadow-lg">
      <ul className="flex justify-around">
        {tabs.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link 
                href={href}
                className={`w-full py-2 flex flex-col items-center ${
                  isActive
                    ? "text-white border-t-2 border-blue-500"
                    : "hover:text-white"
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
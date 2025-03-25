"use client";

import Image from "next/image";
import { JSX, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  Circle,
  LayoutDashboard,
  BarChart3,
  Settings,
  Network,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export type SidebarItem = {
  name: string;
  href?: string;
  icon?: JSX.Element;
  subItems?: SidebarItem[];
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} className="text-primary" />,
  },
  {
    name: "Branch",
    href: "/branches",
    icon: <Network size={18} className="text-primary" />,
  },
  {
    name: "Analytics",
    icon: <BarChart3 size={18} className="text-primary" />,
    subItems: [
      { name: "Reports", href: "#" },
      { name: "Charts", href: "#" },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings size={18} className="text-primary" />,
  },
];

export default function MainLayout({
  children,
  title,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  const pathName = usePathname();
  const router = useRouter();

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderMenuItems = (items: SidebarItem[], level = 0) => (
    <ul className={`space-y-1 transition-all duration-300`}>
      {items.map((item) => (
        <li key={item.name}>
          <div
            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all
              text-primary hover:bg-gray-200
              ${openDropdowns[item.name] ? "border-l-4 border-primary pl-2" : "pl-2"}
              ${pathName === item.href ? "bg-gray-200" : ""}`}
            onClick={() =>
              item.subItems
                ? toggleDropdown(item.name)
                : item.href && router.push(item.href)
            }
          >
            <span className="flex items-center space-x-2">
              {level === 0 ? item.icon : <Circle size={6} className="text-primary" />}
              <span className="text-sm font-medium">{item.name}</span>
            </span>
            {item.subItems && (
              <span className="transition-transform duration-300">
                {openDropdowns[item.name] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </span>
            )}
          </div>
          {item.subItems && openDropdowns[item.name] && (
            <div className="pl-4 overflow-hidden transition-all max-h-96 opacity-100">
              {renderMenuItems(item.subItems, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-4 overflow-y-auto 
          transition-transform duration-300 z-50 md:relative md:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4 md:hidden text-gray-600"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={24} />
        </button>
        <div className="flex items-center justify-center h-16">
          <Image
            src="https://s3-us-west-2.amazonaws.com/issuewireassets/primg/142703/microknot-logo-white-bg-011377451722.png"
            alt="Logo"
            width={800}
            height={500}
          />
        </div>
        {renderMenuItems(sidebarItems)}
      </div>

      {/* Blurred Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Header */}
        <nav className="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] h-16 bg-white shadow-md flex items-center px-6 justify-between z-40">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          {title && <h2 className="text-lg font-semibold text-primary">{title}</h2>}
          <div className="relative">
            <button
              className="text-gray-600 flex items-center"
              onClick={() => setUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer">
                <User size={24} />
              </div>
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 border border-gray-200">
                <a href="#" className="flex items-center p-2 hover:bg-gray-100 rounded">
                  <User size={18} className="mr-2" /> Profile
                </a>
                <button
                  className="w-full flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => {
                    router.push("/auth/logout");
                  }}
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content - Scrollable */}
        <main className="mt-16 h-[calc(100vh-4rem)] p-2 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

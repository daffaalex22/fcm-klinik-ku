import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b flex items-center justify-between px-4 md:px-20 lg:px-64 py-5 shadow-sm text-black dark:text-white">
      <span
        className="font-extrabold text-3xl tracking-wide cursor-pointer hover:opacity-80 italic"
        onClick={() => router.push("/")}
      >
        Notify
      </span>
      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <Button
          variant="outline"
          onClick={handleLogout}
          className="hover:cursor-pointer border-neutral-300 bg-white text-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

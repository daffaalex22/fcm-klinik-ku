import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b flex items-center justify-between px-4 py-5 shadow-sm italic">
      <span className="font-extrabold text-3xl tracking-wide">Notify</span>
      <Button variant="outline" onClick={handleLogout} className="ml-auto">
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;

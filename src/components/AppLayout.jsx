"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/diagram/database"];
  const showNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

export default AppLayout;

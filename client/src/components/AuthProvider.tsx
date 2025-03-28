"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken, removeToken } from "@/_utils/cookies";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
// import Navbar from "./NavBar";

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false); // Initially set to null to represent loading state
  const token = getToken();
  //   removeToken();
  const pathname = usePathname();
  console.log("token", token);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      if (pathname?.includes("/login") || pathname === "/") {
        router.push("/dashboard");
      }
    } else {
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [token, pathname, router]);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {isAuthenticated ? (
        <>
          <SideNavbar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="pt-8 px-8">{children}</div>
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default AuthProvider;

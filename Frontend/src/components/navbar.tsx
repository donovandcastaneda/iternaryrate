"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../app/session/use-auth-context";
import { useEffect, useState } from "react";

const Navbar = ({}) => {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <nav className="sticky shadow-md h-16"></nav>;
  }

  return (
    <nav className="sticky shadow-md">
      <div className=" sticky w-10/12 mx-auto h-18">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}

          <div></div>
          {/* Searchbar */}

          <div className=" items-center flex w-full max-w-sm space-x-2">
            <Input type="search" placeholder="search for locations" />
            <Button type="submit">Search</Button>
          </div>

          <div id="links" className="flex  ">
            <div className="mr-11">
              <Button>
                <Link href="/">Home</Link>
              </Button>
            </div>

            {isAuthenticated ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <div id="auth" className="space-x-2">
                <Button>
                  <Link href="/auth/register">Register</Link>
                </Button>
                <Button>
                  <Link href="/auth/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

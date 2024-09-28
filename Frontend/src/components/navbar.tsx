import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


const Navbar = ({}) => {
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

          <div id="links" className="flex max-w-m space-x-2">
            <Button>
              <Link href="/auth/register">Register</Link>
            </Button>
            <Button>
              <Link href="/auth/register">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

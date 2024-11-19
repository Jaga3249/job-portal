import { Link } from "react-router-dom";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src="/logo.png" alt="logo" className="h-20" />
        </Link>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
        <Button>Sign In</Button>
      </nav>
    </>
  );
};
export default Header;

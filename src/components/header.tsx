import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Briefcase, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
// import { Button } from "./ui/button";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  const handleOverLayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src="/logo.png" alt="logo" className="h-20" />
        </Link>
        <div className="flex gap-3">
          <SignedOut>
            <Button variant={"outline"} onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {/* add condiion */}
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to={"/post-job"}>
                <Button variant={"blue"}>Post Job</Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<Briefcase className="" size={20} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart className="" size={20} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="flex justify-center items-center inset-0 z-50 fixed bg-black bg-opacity-50"
          onClick={handleOverLayClick}
        >
          <SignIn signUpForceRedirectUrl="/" fallbackRedirectUrl="/" />
        </div>
      )}
    </>
  );
};
export default Header;

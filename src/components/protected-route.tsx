import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { isLoaded, isSignedIn } = useUser();
  //   const pathname = useLocation;
  if (isLoaded && !isSignedIn && isSignedIn != undefined) {
    return <Navigate to="/?sign-in=true" />;
  }
  return children;
};
export default ProtectedRoute;

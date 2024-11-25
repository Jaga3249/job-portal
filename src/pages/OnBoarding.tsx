import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const handleSelectRole = async (role: string) => {
    await user
      ?.update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "candidate" ? "/jobs" : "/post-job");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "candidate" ? "/jobs" : "/post-job"
      );
    }
  }, [user]);
  if (!isLoaded) {
    return <BarLoader color="#00BFFF" width={"100%"} />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title text-7xl sm:text-8xl font-extrabold tracking-tighter">
        I am a...
      </h2>
      <div className="grid grid-cols-2  gap-4 mt-16 md:px-20 w-full sm:w-[60%]">
        <Button
          variant={"blue"}
          size={"xl"}
          className="text-2xl py-10"
          onClick={() => handleSelectRole("candidate")}
        >
          Candidate
        </Button>
        <Button
          className="text-2xl py-10"
          variant={"destructive"}
          size={"xl"}
          onClick={() => handleSelectRole("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};
export default Onboarding;

import { useEffect } from "react";
import { getJobs } from "../api/apijobs";
import useFetch, { JobPosting } from "../hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "../components/job-card";

const JobListing = () => {
  const { isLoaded } = useUser();
  const { data, loading, error, fn: fnjobs } = useFetch({ cb: getJobs });

  useEffect(() => {
    if (isLoaded) {
      fnjobs();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <BarLoader color="#00BFFF" width={"100%"} />;
  }
  // console.log("data", data);

  return (
    <div>
      <h1 className="gradient-title text-6xl sm:text-7xl text-center pb-8 font-extrabold">
        Latest Jobs
      </h1>
      {loading && <BarLoader color="#00BFFF" width={"100%"} className="mt-4" />}
      {!loading && data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {data.map((job: JobPosting) => (
            <JobCard
              key={job.id}
              job={job}
              SavedInit={job?.saved?.length > 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-xl font-semibold">
          No Jobs Found 😢
        </div>
      )}
    </div>
  );
};

export default JobListing;

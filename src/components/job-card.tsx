import { useState } from "react";
import { HeartIcon, MapPin, Trash2Icon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import useFetch, { JobPosting } from "../hooks/use-fetch";
import { savedJob } from "../api/apijobs";

interface JobCardProps {
  job: JobPosting;
  SavedInit?: boolean;
}

const JobCard = ({ job, SavedInit = false }: JobCardProps) => {
  const [save, setSave] = useState(SavedInit);
  const { fn: saveJob, loading } = useFetch({
    cb: savedJob,
    options: { alreadySaved: save },
  });
  const { user } = useUser();

  const handleSaveJob = async () => {
    try {
      const response = await saveJob({
        user_id: user?.id,
        job_id: job.id,
      });
      setSave(response === null ? false : response.length > 0);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job?.title} <Trash2Icon className="text-red-500 cursor-pointer" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {job?.company && (
            <img
              src={job?.company?.logo_url}
              alt="company logo"
              className="h-7"
            />
          )}
          <span className="flex gap-2 items-center">
            <MapPin />
            {job.location}
          </span>
        </div>
        <hr className="my-3" />
        {job?.description.substring(0, job.description.indexOf("."))}.
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Link to={`/job/${job.id}`} className="w-full flex-1 ">
          <Button className="w-full" variant={"secondary"} size={"lg"}>
            Apply Now
          </Button>
        </Link>
        <Button
          variant={"outline"}
          className="w-16"
          onClick={handleSaveJob}
          disabled={loading}
        >
          {save ? (
            <HeartIcon className="text-red-500 cursor-pointer" fill="red" />
          ) : (
            <HeartIcon />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;

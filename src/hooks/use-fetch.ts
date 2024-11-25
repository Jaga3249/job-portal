import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

interface Company {
  logo_url: string;
  name: string;
}

export interface JobPosting {
  company: Company;
  company_id: number;
  created_at: string;
  description: string;
  id: number;
  isOpen: boolean;
  location: string;
  recruiter_id: string;
  requirements: string;
  saved: any[]; // Adjust the type of `saved` based on the expected structure of its elements, if known
  title: string;
}

const useFetch = ({ cb, options = { name: "jaga" } }: any) => {
  const [data, setData] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useSession();
  // console.log(cb);

  const fn = async (...args: any) => {
    let saveData = args[0];
    setLoading(true);
    setError(null);
    try {
      const token = await session?.getToken({
        template: "supabase",
      });
      // console.log("token", token);
      const response = await cb({
        token,
        alreadySaved: options.alreadySaved,
        saveData,
      });
      setData(response);
      setError(null);
      return response;
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fn };
};
export default useFetch;

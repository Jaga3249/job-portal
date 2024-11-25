import supabaseClient from "../utils/supabase";

interface OptionalType {
  location?: string;
  company_id?: string;
  searchQuery?: string;
}

export interface JobsType {
  token: string;
  options?: OptionalType;
}
export interface SavedJobType {
  token: string;
  alreadySaved: boolean;
  saveData: {
    user_id: string;
    job_id: number;
  };
}

export const getJobs = async ({ token, options }: JobsType) => {
  const supabase = await supabaseClient(token);

  // Build the query dynamically
  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved:saved_job(id)");

  // Apply filters
  if (options?.location) {
    query = query.eq("location", options.location);
  }

  if (options?.company_id) {
    query = query.eq("company_id", options.company_id);
  }

  if (options?.searchQuery) {
    query = query.ilike("job_title", `%${options.searchQuery}%`); // Assuming a column `job_title` for search
  }

  // Execute the query
  const { data, error } = await query;

  if (error) {
    console.error("Error in jobs query", error);
    return null;
  }

  return data;
};
export const savedJob = async ({
  token,
  alreadySaved,
  saveData,
}: SavedJobType) => {
  // console.log(token, alreadySaved, saveData);
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error } = await supabase
      .from("saved_job")
      .delete()
      .eq("job_id", saveData.job_id);

    if (error) {
      console.error("Error in delete saved job query", error);
      return null;
    }
    // console.log("data", data);
    return data;
  } else {
    const { data, error } = await supabase
      .from("saved_job")
      .insert([saveData])
      .select();
    if (error) {
      console.error("Error in saved job query", error);
      return null;
    }
    // console.log("data", data);

    return data;
  }
};

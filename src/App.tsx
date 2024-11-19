import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/app-layout";
import LandingPage from "./pages/landing";

import JobListing from "./pages/job-listing";
import JobPage from "./pages/Job";
import PostJobs from "./pages/post-Jobs";
import SavedJobs from "./pages/Saved-Jobs";
import MyJobs from "./pages/my-Jobs";
import Onboarding from "./pages/onboarding";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/job/:id",
        element: <JobPage />,
      },
      {
        path: "/post-job",
        element: <PostJobs />,
      },
      {
        path: "/saved-jobs",
        element: <SavedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

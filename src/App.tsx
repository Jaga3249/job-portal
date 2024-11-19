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
import ProtectedRoute from "./components/protected-route";

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
        element: (
          <ProtectedRoute>
            {" "}
            <Onboarding />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            {" "}
            <JobListing />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <JobPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJobs />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            {" "}
            <SavedJobs />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            {" "}
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

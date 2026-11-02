import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../components/layout/MainLayout/MainLayout";
import {ProtectedRoute} from "../components/ProtectedRoute/ProtectedRoute";
import {LoginForm} from "../features/auth/LoginForm/LoginForm";
import {RegisterForm} from "../features/auth/RegisterForm/RegisterForm";
import {CreatePoll} from "../pages/CreatePoll/CreatePoll";
import {Landing} from "../pages/Landing/Landing";
import {PollsList} from "../pages/Polls/PollsList";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/signin",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <RegisterForm />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "polls",
            element: <PollsList />,
          },
          {
            path: "polls/new",
            element: <CreatePoll />,
          },
        ],
      },
    ],
  },
]);

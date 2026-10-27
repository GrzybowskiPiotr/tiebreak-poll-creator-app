import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../components/layout/MainLayout/MainLayout";
import {LoginForm} from "../features/auth/LoginForm/LoginForm";
import {RegisterForm} from "../features/auth/RegisterForm/RegisterForm";
import {Landing} from "../pages/Landing/Landing";

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
    ],
  },
]);

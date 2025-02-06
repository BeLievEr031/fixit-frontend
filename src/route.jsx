import { createBrowserRouter } from "react-router-dom";
import Root from "./Layouts/root/Root";
import DashBoardLayout from "./Layouts/Dashboard/DashBoardLayout";
import NonAuth from "./Layouts/NonAuth/NonAuth";
import SignUp from "./pages/SignUp/Sign";
import Auth from "./Layouts/Auth/Auth";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Worker from "./pages/Worker/Worker";
import Problem from "./pages/Problem/Problem";
import BecomeWorker from "./pages/BecomeWorker/BecomeWorker";
import Profile from "./pages/Profile/Profile";
import AllBids from "./pages/AllBids/AllBids";
import WorkerBid from "./pages/WorkerBid/WorkerBid";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Auth />,
        children: [
          {
            path: "",
            element: <DashBoardLayout />,
            children: [
              {
                path: "",
                element: <Dashboard />,
              },
              {
                path: "worker",
                element: <Worker />,
              },
              {
                path: "problem",
                element: <Problem />,
              },
              {
                path: "problem/bid/:id",
                element: <AllBids />,
              },
              {
                path: "become-worker",
                element: <BecomeWorker />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "my-bids",
                element: <WorkerBid />,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <NonAuth />,
        children: [
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;

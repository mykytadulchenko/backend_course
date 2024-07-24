import { createBrowserRouter } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/Landing"
import PrivateRoute from "./components/PrivateRoute"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
    ],
  },
])

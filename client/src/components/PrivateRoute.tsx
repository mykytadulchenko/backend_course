import { Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Landing from "../pages/Landing"

const PrivateRoute = () => {
  const { isAuth } = useAuth()

  return isAuth ? <Outlet /> : <Landing />
}

export default PrivateRoute

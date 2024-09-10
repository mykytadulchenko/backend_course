import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useDispatchStore from "../hooks/useDispatchStore"
import { setUser } from "../store/reducers/userReducer"
import { State } from "../store/store"
import { getTokens } from "../utils/tokensHandler"

interface IAuth {
  isAuth: boolean
  setAuth: Dispatch<SetStateAction<boolean>>
}

const authContext = createContext<IAuth>({
  isAuth: false,
  setAuth: () => {},
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { id: userId } = useSelector((state: State) => state.user)
  const [isAuth, setAuth] = useState(false)
  const dispatch = useDispatchStore()

  useEffect(() => {
    const tokens = getTokens()
    if (tokens) {
      const user = JSON.parse(atob(tokens.accessToken.split(".")[1]))
      dispatch(setUser({ id: user.id, userName: user.username, error: "" }))
      setAuth(true)
    }
  }, [])

  useEffect(() => {
    setAuth(userId ? true : false)
  }, [userId])

  return <authContext.Provider value={{ isAuth, setAuth }}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

export default AuthProvider

import { ChangeEvent, FormEvent, useState } from "react"
import { useSelector } from "react-redux"
import useDispatchStore from "../hooks/useDispatchStore"
import { State } from "../store/store"
import { signInUser } from "../store/thunks/userThunks"


const SignInForm = () => {
  const dispatch = useDispatchStore()
  const state = useSelector((state: State) => state.user)
  const fieldDefaults = {
    username: '',
    password: ''
  }
  const [fields, setFields] = useState(fieldDefaults)
  const fieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signInUser(fields))
  }
  return (
    <div style={{ maxWidth: "35%" }}>
      <h1>Sign in</h1>
      <form action="submit" onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
        <input name="username" type="text" placeholder="login" onChange={fieldHandler} value={fields.username} />
        <input name="password" type="password" placeholder="password" onChange={fieldHandler} value={fields.password} />
        <input type="submit" value="Sign in" />
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}
export default SignInForm

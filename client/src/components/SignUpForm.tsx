import { ChangeEvent, FormEvent, useState } from "react"
import client from "../utils/axios"

const SignUpForm = () => {
  const fieldDefaults = {
    username: "",
    password: "",
    email: "",
    name: "",
  }
  const [fields, setFields] = useState(fieldDefaults)
  const fieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await client.post("/auth/sign-up", fields)
      setFields(fieldDefaults)
    } catch (err: any) {
      console.error(err.message)
    }
  }
  return (
    <div style={{ maxWidth: "35%" }}>
      <h1>Sign in</h1>
      <form action="submit" onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
        <input name="name" type="text" placeholder="name" onChange={fieldHandler} value={fields.name} />
        <input name="username" type="text" placeholder="login" onChange={fieldHandler} value={fields.username} />
        <input name="email" type="text" placeholder="email" onChange={fieldHandler} value={fields.email} />
        <input name="password" type="password" placeholder="password" onChange={fieldHandler} value={fields.password} />
        <input type="submit" value="Sign up" />
      </form>
    </div>
  )
}
export default SignUpForm

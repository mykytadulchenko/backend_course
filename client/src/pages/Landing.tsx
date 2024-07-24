import { useState } from "react"
import SignInForm from "../components/SignInForm"
import SignUpForm from "../components/SignUpForm"

const Landing = () => {
  const [showLoginForm, setShowLoginFrom] = useState(true)
  const switchFormHandler = () => {
    setShowLoginFrom((prev) => !prev)
  }
  return (
    <div>
      {showLoginForm ? (
        <>
          <SignInForm />
          <p style={{ maxWidth: "fit-content", cursor: "pointer" }} onClick={switchFormHandler}>
            Switch to sign up
          </p>
        </>
      ) : (
        <>
          <SignUpForm />
          <p style={{ maxWidth: "fit-content", cursor: "pointer" }} onClick={switchFormHandler}>
            Switch to sign in
          </p>
        </>
      )}
    </div>
  )
}
export default Landing

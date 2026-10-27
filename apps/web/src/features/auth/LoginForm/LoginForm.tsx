import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {authClient} from "../../../lib/auth-client";
import style from "./LoginForm.module.css";
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function submitHandler(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {password, email};
    const {data, error} = await authClient.signIn.email(formData);

    if (data) {
      navigate("/");
    }

    if (error) {
      console.error(error.message);
      return;
    }
  }

  return (
    <div className={style.formContainer}>
      <h2>sign in</h2>
      <form onSubmit={submitHandler}>
        <label>
          <p>Your email</p>
          <input
            type='text'
            required
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>password</p>
          <input
            type='password'
            required
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>SignIn</button>
      </form>
    </div>
  );
}

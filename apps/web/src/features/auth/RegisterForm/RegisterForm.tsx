import {useState} from "react";

import {authClient} from "../../../lib/auth-client";
import style from "./RegisterForm.module.css";
export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {name, password, email};
    const {data, error} = await authClient.signUp.email(formData);

    if (error) {
      console.error(error.message);
      return;
    }

    console.log(`Registered user: ${data.user.name}`);
  }

  return (
    <div className={style.formContainer}>
      <h2>sign up</h2>
      <form onSubmit={submitHandler}>
        <label>
          <p>Your user name</p>
          <input
            type='text'
            required
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p>email</p>
          <input
            type='email'
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
        <button type='submit'>SignUp</button>
      </form>
    </div>
  );
}

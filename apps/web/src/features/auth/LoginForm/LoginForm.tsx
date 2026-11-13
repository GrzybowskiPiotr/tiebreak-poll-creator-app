import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FormContainer} from "../../../components/ui/FormContainer/FormContainer";
import {authClient} from "../../../lib/auth-client";
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submitHandler(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {password, email};
    const {data, error} = await authClient.signIn.email(formData);

    if (data) {
      navigate("/polls");
    }

    if (error) {
      console.error(error.message);
      return;
    }
  }

  return (
    <FormContainer>
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
            autoComplete='email'
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
            autoComplete='current-password'
          />
        </label>
        <button type='submit'>Sign In</button>
      </form>
    </FormContainer>
  );
}

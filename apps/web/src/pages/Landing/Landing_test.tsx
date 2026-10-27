import {Link} from "react-router-dom";
import {authClient} from "../../lib/auth-client";
import style from "./Landing.module.css";

export function Landing() {
  const {data, isPending} = authClient.useSession();

  if (isPending === true) {
    return <p>Ładowanie sesji...</p>;
  }

  if (data?.session) {
    return (
      <div className={style.welcomeContainer}>
        <h2>{`welcom back ${data.user.name}`}</h2>
        <p>{data.user.email}</p>
        <button onClick={() => authClient.signOut()}>SingOut</button>
      </div>
    );
  }
  return (
    <div className={style.welcomeContainer}>
      <h2>Welcom to TieBraek</h2>
      <div className={style.buttonContainer}>
        <Link to='/signin'>Sign In</Link>
        <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
}

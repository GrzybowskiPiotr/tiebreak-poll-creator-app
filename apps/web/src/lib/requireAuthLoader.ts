import {redirect} from "react-router-dom";
import {authClient} from "./auth-client";
export async function requireAuthLoader() {
  const {data, error} = await authClient.getSession();

  if (error !== null) {
    throw new Error(error.message);
  }

  if (!data) {
    return redirect("/signin");
  }
}

import {Navigate, Outlet} from "react-router-dom";
import {authClient} from "../../lib/auth-client";
import {Loading} from "./ui/Loading/Loading";

export function ProtectedRoute() {
  const {data: session, isPending} = authClient.useSession();

  if (isPending)
    return (
      <div style={{marginTop: "40%"}}>
        <Loading loading_title='session check' />
      </div>
    );

  if (!session?.session) {
    return <Navigate to='/signin' replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

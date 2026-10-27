import {authClient} from "../../lib/auth-client";
import "./App.css";
function App() {
  const {data: session, isPending} = authClient.useSession();

  if (isPending) return <p>Ładowanie sesji...</p>;

  return (
    <>
      <div>{JSON.stringify(session, null, 2)}</div>
    </>
  );
}

export default App;

import {Loading} from "../../components/ui/Loading/Loading";
import {usePolls} from "../../features/polls/hooks/usePolls";
import {authClient} from "../../lib/auth-client";
export function PollsList() {
  const {data} = authClient.useSession();
  const userId = data?.user.id;

  const polls = usePolls(userId);

  if (polls.isPending) {
    return (
      <div style={{marginTop: "40%"}}>
        <Loading loading_title='getting polls' />
      </div>
    );
  }

  if (polls.isError) {
    return (
      <div style={{marginTop: "40%"}}>
        <h2>Error while getting Your polls</h2>
        <p>{polls.error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>{`Welcome back ${data?.user.name}`}</h2>
        <br />

        <br />
        {polls.data.length === 0 ? (
          <div>
            <h3>You haven't created any polls yet.</h3>
          </div>
        ) : (
          <p>Polls List</p>
        )}
      </div>
    </>
  );
}

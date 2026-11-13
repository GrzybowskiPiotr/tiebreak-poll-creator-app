import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export function ErrorElement() {
  const error = useRouteError();
  const isMessage = isRouteErrorResponse(error);

  if (isMessage !== null) {
    console.log(error);
  }

  return (
    <div>
      <h2>Something went wrong...</h2>
    </div>
  );
}

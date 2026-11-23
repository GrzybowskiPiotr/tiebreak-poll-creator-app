import type {CreatePollPayload} from "../types/poll.types";

export function getPolls() {
  const url = "/api/polls";

  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Resposnse status: ${res.status}`);
    }
    return res.json();
  });
}

export function sendPoll(data: CreatePollPayload) {
  const url = "/api/polls";

  return fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return res.json();
  });
}

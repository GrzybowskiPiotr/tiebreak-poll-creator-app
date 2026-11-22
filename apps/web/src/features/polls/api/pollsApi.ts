export function getPolls() {
  const url = "/api/polls";

  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Resposnse status: ${res.status}`);
    }
    return res.json();
  });
}

import { url } from "../../app/constants";

export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch(url.BackendUrl);
    const data = await response.json();
    resolve({ data });
  });
}

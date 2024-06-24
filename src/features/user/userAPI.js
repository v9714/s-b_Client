import { url } from "../../app/constants";

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(url.BackendUrl + "/orders/get/");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(url.BackendUrl + "/users/get");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(url.BackendUrl + "/users/update", {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

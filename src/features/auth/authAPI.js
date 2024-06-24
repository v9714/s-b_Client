import { url } from "../../app/constants";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(url.BackendUrl + "/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
        credentials: "include"
    });
    console.log(response);
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Request payload:", loginInfo);
      const response = await fetch(url.BackendUrl + "/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
        credentials: "include"
      });
      if (!response.ok) {
        const data = await response.text();
        console.log(data);
        reject(data);
      }
      const data = await response.json();
      console.log("Response data:", data);
      resolve({ data });
    } catch (error) {
      console.error("Error checking user:", error);
      reject(error);
    }
  });
}

// export function loginUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       console.log("Request payload:", loginInfo);
//       const response = await fetch(url.BackendUrl + "/auth/login", {
//         method: "POST",
//         body: JSON.stringify(loginInfo),
//         headers: { "content-type": "application/json" },
//         credentials: "include", // Ensure credentials are included in the request
//       });
//       console.log(response.data);

//       if (!response.ok) {
//         const data = await response.text();
//         console.log(data);
//         reject(data);
//       }

//       const data = await response.json();
//       console.log("Response data:", data);
//       resolve({ data });
//     } catch (error) {
//       console.error("Error checking user:", error);
//       reject(error);
//     }
//   });
// }

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url.BackendUrl + "/auth/check");
      if (!response.ok) {
        const data = await response.text();
        console.log(data);
        reject(data);
      }
      const data = await response.json();
      console.log("Response data:", data);
      resolve({ data });
    } catch (error) {
      console.error("Error checking user:", error);
      reject(error);
    }
  });
}

export function resetPasswordRequst(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        url.BackendUrl + "/auth/forgot_passwordrequst",
        {
          method: "POST",
          body: JSON.stringify(email),
          headers: { "content-type": "application/json" },
        }
      );

      if (!response.ok) {
        const data = await response.text();
        console.log(data);
        reject(data);
      }
      console.log(response, " resetPasswordRequst");

      const data = await response.json();
      console.log("Response data:", data);
      resolve({ data });
    } catch (error) {
      console.error("Error checking user:", error);
      reject(error);
    }
  });
}

export function resetPassword(resetData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        url.BackendUrl + "/auth/forgot_resetpassword",
        {
          method: "POST",
          body: JSON.stringify(resetData),
          headers: { "content-type": "application/json" },
        }
      );
      console.log(response, " resetPassword");
      if (!response.ok) {
        const data = await response.text();
        console.log(data);
        reject(data);
      }
      console.log(response);
      const data = await response.json();
      console.log("Response data:", data);
      resolve({ data });
    } catch (error) {
      console.error("Error checking user:", error);
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout");
      if (response.ok) {
        resolve({ data: "success" });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

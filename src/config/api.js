import axios from "axios";

const scalerApi = axios.create({
  baseURL: process.env.REACT_APP_SCALER_API || "http://localhost:3000",
});

scalerApi.interceptors.request.use((req) => {
  const idToken = sessionStorage.getItem("idToken");
  if (idToken) {
    req.headers["Authorization"] = `Bearer ${idToken}`;
  }
  return req;
});

export default scalerApi;

export function parseError(error) {
  const code = { ...error }?.response?.data?.error?.code;

  switch (code) {
    case "users/short-password":
      return "Password must be at least 8 characters";

    case "users/displayname-required":
      return "Username must be provided";

    case "auth/email-already-exists":
      return "Email already registred";

    case "auth/too-many-requests":
      return "Too many attempts, try again later";

    case "auth/invalid-email":
    case "auth/user-not-found":
      return "Incorrect email";

    case "auth/wrong-password":
      return "Incorrect password";

    case "auth/internal-error":
    default:
      return "Oops something went wrong";
  }
}

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return "Email required";
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Email invalid";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password || !password.trim()) {
    return "Password required";
  }

  if (!/[\S]{8}/.test(password)) {
    return "Password invalid";
  }

  return "";
};

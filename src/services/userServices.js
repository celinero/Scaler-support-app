export const logInUser = (logInDetails) => {
  return new Promise((resolve, reject) => {
    resolve(logInDetails.email)
  })
}
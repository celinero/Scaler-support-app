import scalerApi from "../config/api"

export const logInUser =  async (logInDetails) => {
    try {
       const response = await scalerApi.post('/users/sign-in', logInDetails);
       return response.data;
    } catch(error) {
        throw error
    }
}

export const validateUserSession = async (idToken) => {
    try {
        const response = await scalerApi.post('/users/validate-session', { idToken })
        return response.data;
     } catch(error) {
         throw error
     }
}
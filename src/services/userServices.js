import scalerApi from "../config/api"

export const logInUser =  async (logInDetails) => {
    try {
       const response = await scalerApi.post('/users/sign-in', logInDetails);
       return response.data;
    } catch(error) {
        throw error
    }
}

export const validateUserSession = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken')
    const idToken = sessionStorage.getItem('idToken')

    if (!refreshToken || !idToken) return null

    const response = await scalerApi.post('/users/validate-session', {
        refreshToken, idToken
    })

    if (response.data.isValid) {
        return { email: response.data.fullDecodedToken.email }
    }

    return null
}
import scalerApi from "../config/api"

export const getCategories = async () => {
  try {
    const response = await scalerApi.get('/categories')
    return response.data;
  } catch (err){
    throw err;
  }
}
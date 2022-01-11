import scalerApi from '../config/api'

// create promise with axios
export const getTickets = async () => {
  try {
    const response = await scalerApi.get('/tickets');
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getTicket = async (id) => {
  try {
    const response = await scalerApi.get(`/tickets/${id}`);
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateTicket = async (id, ticketObject) => {
  try {
    const response = await scalerApi.put(`/tickets/${id}`, ticketObject);
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}


export const createNewTicket = async (ticketObject) => {
  try {
    const response = await scalerApi.post(`/tickets`, ticketObject);
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const addMessageToTicket = async (id, ticketObject) => {
  try {
    const response = await scalerApi.post(`/tickets/${id}/message`, ticketObject);
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}
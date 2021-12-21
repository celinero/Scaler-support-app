import tickets from '../data/tickets';
import scalerApi from '../config/api'


// create promise with axios
export const getTickets = async () => {
  try {
    const response = await scalerApi.get('/tickets');
    return response.data;
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getTicket = (tickets, id) => {
  return new Promise((resolve, request) => {
    setTimeout(() => {
      resolve(tickets.find(ticket => ticket.id === parseInt(id)))
    }, 500)
  })
}

const getnextId = () => {
  const maxId = Math.max(...tickets.map(ticket => ticket.id));
  return maxId + 1;
}


//faking database
export const createNewTicket = (ticketObject) => {
  const newTicket = {
    ...ticketObject,
    category: ticketObject.category || "General Feedback",
    updated_at: Date.now(),
    id: getnextId()
  }
  return new Promise((resolve, request) => {
    setTimeout(() => {
      resolve(newTicket);
    }, 500)
  })

}
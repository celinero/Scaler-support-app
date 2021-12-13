import tickets from '../data/tickets';

// create promise faking fetch
export const getTickets = () => {
  return new Promise((resolve, request) => {
    setTimeout(() => {
      resolve(tickets)
    }, 500)
  })
}

export const getTicket = (id) => {
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
    updated_at: Date.now(),
    id: getnextId()
  }
  return new Promise((resolve, request) => {
    setTimeout(() => {
      resolve(newTicket);
    }, 500)
  })

}
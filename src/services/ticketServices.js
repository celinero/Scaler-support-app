import tickets from '../data/tickets';

// create promise faking fetch
export const getTickets = () => {
  return new Promise((resolve, request) => {
    setTimeout(() => {
      resolve(tickets)
    }, 500)
  })
}

import React from "react";

const Tickets = (props) => {
const {loading, tickets} = props;

  return(
    <div>
      {loading ?(<p>Loading</p>) : (<p>Got tickets</p>)}
    </div>
  )
}

export default Tickets;
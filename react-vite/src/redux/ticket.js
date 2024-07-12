const GET_ALL_TICKETS = "/get/all/tickets"
const GET_TICKET_ID = "/get/ticket/id"
const CREATE_TICKET = "/post/ticket"
const EDIT_TICKET = "/put/ticket"

const getAllTickets = (tickets) => ({
    type: GET_ALL_TICKETS,
    payload: tickets
})

const getTicketId = (ticket) => ({
    type: GET_TICKET_ID,
    payload: ticket
})
const postTicket = (ticketImage, newTicket) => ({
    type: CREATE_TICKET,
    payload: {
        ticketImage,
        newTicket
    }
})

const putTicket = (ticketImage, newTicket) => ({
    type: EDIT_TICKET,
    payload: {
      ticketImage,
      newTicket
    }
})

export const getAllTicketsThunk = () => async (dispatch) => {
  
  const response = await fetch(`/api/tickets/`)
  if (response.ok) {
    
    const tickets = await response.json()
    // console.log("TICKETS", tickets)
    dispatch(getAllTickets(tickets))
    
  } else {
    console.log("ALL TICKETS THUNK NOT OK")
  }
}
export const getTicketIdThunk = (ticket_id) => async (dispatch) => {
  // console.log(ticket_id, "ticketID in thunk")
  const response = await fetch(`/api/tickets/${ticket_id}`)
  if (response.ok) {
    const ticket = await response.json()
    dispatch(getTicketId(ticket))
  } else {
    console.log("Ticket Not Found")
  }
}
export const postTicketThunk = (image, newTicket) => async (dispatch) => {
  console.log("FORM DATA", image)
  console.log("newTicket", newTicket)

  const formData = new FormData();
  formData.append('image', image);


      const ticketResponse = await fetch('/api/tickets/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTicket)
      })
      
      let ticket_id;
      if (ticketResponse.ok) {
        console.log("TICKET SENT TO ROUTES")
          const newTicket = await ticketResponse.json()
          ticket_id = newTicket.id
      } else {
          console.log("There was an error making your ticketResponse!")
      }

      const imageResponse = await fetch(`/api/tickets/${ticket_id}/add-image`, {
        method: "POST",
        body: formData
      });
    

      if (imageResponse.ok) {
        console.log("IMAGE SENT TO ROUTES")
        const ticketImage = await imageResponse.json();
         
        dispatch(postTicket(ticketImage, newTicket));
        
    } else {
        console.log("There was an error making your ImageResponse!")
    }
  };

  export const putTicketThunk = (image, newTicket, ticket_id) => async (dispatch) => {
    console.log("FORM DATA", image)
    console.log("newTicket", newTicket)
    console.log(ticket_id, "here in putTicketThunk")
  
    const formData = new FormData();
    formData.append('image', image);
  
  
        const ticketResponse = await fetch(`/api/tickets/${ticket_id}/edit`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newTicket)
        })
        
        if (ticketResponse.ok) {
          console.log("TICKET SENT TO ROUTES")
            const newTicket = await ticketResponse.json()
            dispatch(putTicket(newTicket));
        } else {
            console.log("There was an error making your ticketResponse!")
        }
  
        const imageResponse = await fetch(`/api/tickets/${ticket_id}/edit-image`, {
          method: "PUT",
          body: formData
        });
      
  
        if (imageResponse.ok) {
          console.log("IMAGE SENT TO ROUTES")
          const ticketImage = await imageResponse.json();
           
          dispatch(putTicket(ticketImage, newTicket));
          
      } else {
          console.log("There was an error making your ImageResponse!")
      }
    };
  
const initialState = {}


function ticketReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_TICKETS:
        return {...state, tickets: action.payload}
      case GET_TICKET_ID:
        return {...state, ticketById: action.payload}
      case EDIT_TICKET:
        return {...state, EditedTicket: action.payload}
      case CREATE_TICKET:
        return { ...state, NewTicket: action.payload};
      default:
        return state;
    }
  }
  
  export default ticketReducer;
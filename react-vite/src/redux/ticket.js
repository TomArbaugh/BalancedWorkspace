const CREATE_TICKET = "/post/ticket"

const postTicket = (ticketImage, newTicket) => ({
    type: CREATE_TICKET,
    action: {
        ticketImage,
        newTicket
    }
})

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
          dispatch(postTicket(newTicket));
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
         
        dispatch(postTicket(ticketImage, ticket_id));
        
    } else {
        console.log("There was an error making your ImageResponse!")
    }
  };


const initialState = {}


function ticketReducer(state = initialState, action) {
    switch (action.type) {
      case CREATE_TICKET:
        return { ...state, action};
      default:
        return state;
    }
  }
  
  export default ticketReducer;
const CREATE_TICKET = "/post/ticket"

const postTicket = (ticketImage, newTicket) => ({
    type: CREATE_TICKET,
    action: {
        ticketImage,
        newTicket
    }
})

export const postTicketThunk = (formData, newTicket) => async (dispatch) => {
    const imageResponse = await fetch(`/images/new`, {
        method: "POST",
        // headers: {
        //   'Accept': 'application/json',
        //   "Content-Type": "application/json",
        // },
        body: formData
      });

      const ticketResponse = await fetch('/new-ticket', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTicket)
      })
    
      if (imageResponse.ok && ticketResponse.ok) {
          const { ticketImage } = await imageResponse.json();
          const newTicket = await ticketResponse.json()
          dispatch(postTicket(ticketImage, newTicket));
      } else {
          console.log("There was an error making your post!")
      }
  };


initialState = {}


function ticketReducer(state = initialState, action) {
    switch (action.type) {
      case CREATE_TICKET:
        return { ...state, action};
      default:
        return state;
    }
  }
  
  export default ticketReducer;
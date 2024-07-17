const GET_MESSAGES = "/get/messages"

const getMessages = (messages) => ({
    type: GET_MESSAGES,
    payload: messages
})


export const getMessagesThunk = () => async (dispatch) => {
    const response =  await fetch('/api/messages/')
    if (response.ok) {
        const messages = await response.json()
        dispatch(getMessages(messages))
    }
}
const initialState = {}

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {...state, Messages: action.payload}
      default:
        return state;
    }
  }
  
  export default messageReducer;
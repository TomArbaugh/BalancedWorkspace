const GET_MESSAGES = "/get/messages"
const CREATE_MESSAGE = '/create/message'

const getMessages = (messages) => ({
    type: GET_MESSAGES,
    payload: messages
})

const createMessage = (message) => ({
    type: CREATE_MESSAGE,
    payload: message
})

export const getMessagesThunk = () => async (dispatch) => {
    const response =  await fetch('/api/messages/')
    if (response.ok) {
        const messages = await response.json()
        dispatch(getMessages(messages))
    }
}

export const createMessageThunk = (otherPerson, newMessage) => async (dispatch) => {
    // console.log("OTHERPERSON-TYPE", typeof otherPerson)
    // console.log("OTHERPERSON", otherPerson)
    // console.log("NEWMESSAGE", newMessage)
    const response = await fetch(`/api/messages/create/too/${otherPerson}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify(newMessage)
        }
    })
    if (response.ok) {
        // console.log("IM OK!!!!!")
        const message = await response.json()
        // console.log("MESSAGE", message)
        dispatch(createMessage(message))
    }
}
const initialState = {}

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {...state, Messages: action.payload}
        case CREATE_MESSAGE:
            return {...state, newMessage: action.payload}
      default:
        return state;
    }
  }
  
  export default messageReducer;
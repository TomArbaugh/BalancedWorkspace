const GET_MESSAGES = "/get/messages"
const CREATE_MESSAGE = '/create/message'
const GET_MESSAGE_ID = '/get/message/id'
const DELETE_MESSAGE = '/delete/message'

const getMessages = (messages) => ({
    type: GET_MESSAGES,
    payload: messages
})

const createMessage = (message) => ({
    type: CREATE_MESSAGE,
    payload: message
})

const getMessageId = (message) => ({
    type: GET_MESSAGE_ID,
    payload: message
})

const deleteMessage = (message) => ({
    type: DELETE_MESSAGE,
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
    })
    if (response.ok) {
        // console.log("IM OK!!!!!")
        const message = await response.json()
        // console.log("MESSAGE", message)
        dispatch(createMessage(message))
    }
}

export const getMessageIdThunk = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`)
    if (response.ok) {
        const message = await response.json()
        dispatch(getMessageId(message))
    }
}

export const deleteMessageThunk = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}/delete`)
    if (response.ok) {
        const message = await response.json()
        dispatch(deleteMessage(message))
    }
}
const initialState = {}

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {...state, Messages: action.payload}
        case CREATE_MESSAGE:
            return {...state, newMessage: action.payload}
        case GET_MESSAGE_ID:
            return {...state, theMessage: action.payload}
        case DELETE_MESSAGE:
            return {...state, deletedMessage: action.payload}
      default:
        return state;
    }
  }
  
  export default messageReducer;
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createMessageThunk, getMessagesThunk, editMessageThunk, deleteMessageThunk } from "../../redux/message"
import { thunkLogin} from "../../redux/session"
import { getUsersThunk } from "../../redux/session"
// import DeleteMessage from "../DeleteMessage/DeleteMessage"
// import EditMessage from "../EditMessage/EditMessage"
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"

import "./MessageCenter.css"

function MessageCenter() {
    const [message, setMessage] = useState()
    const [otherPerson, setOtherPerson] = useState()
    const [convoArr, setConvoArr] = useState()
    const [user, setUser] = useState()
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState({})
    const [messId, setMesId] = useState()
    const [yesOrNo, setYesOrNo] = useState(false)
    const dispatch = useDispatch()


 

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])
    const userState = useSelector((state) => state.session)
    const users = userState.allUsers
    const currentUser = userState.user
    const messageState = useSelector((state) => state.message)
    const messages = messageState.Messages
    const newMessage = messageState.newMessage
    const deletedMessage = messageState.deletedMessage
    // console.log(users, "USERS")
    // console.log(messages, "MESSAGES")
    const validations = () => {
        const newError = {}
        if (message.length < 1 ||  message.length > 2000) newError.message = "Message must be between 1 and 2000 characters."
        return newError
    }

    useEffect(() => {
        dispatch(getMessagesThunk())
    }, [newMessage, user, deletedMessage, dispatch])

    useEffect(() => {

    }, [users, convoArr])

    useEffect(() => {
        let tempArr;
        // console.log("HELO FROM OTHERPERSONFUNK")
        tempArr = []
        
        otherPerson ? messages.forEach((message) => {
            
            // console.log(otherPerson)
            if (message.sender_id.toString() === otherPerson || message.receiver_id.toString() === otherPerson || message.sender_id === otherPerson || message.receiver_id === otherPerson) {
                // console.log(message)
                
                tempArr.push(message)
                
            }
            return
        }) : null

       
        setConvoArr(tempArr)
       }, [otherPerson, messages, user])


       const makeEdit = (messageId, message) => {
        setEdit(true)
        setMesId(messageId)
        setMessage(message)
        setUser('0')
       }

       const saveChange = async (messageId) => {
        
        const newError = validations()
        if (Object.keys(newError).length > 0){
            setError(newError)
            return;
        }

        const newMessage = {
            message
        }
        // console.log("THIS IS THE MESSAGE ID",messageId)
        await dispatch(editMessageThunk(messageId, newMessage))

        setEdit(false)
        setMessage()
        setUser(currentUser.id)
        
       }
       
       const makeDelete = () => {
        setYesOrNo(true)
       }

       const handleDelete = (messageId) => {
        dispatch(deleteMessageThunk(messageId))
       }
        
       const logIn = async (e) => {
        e.preventDefault()
            let email;
            let password;
        if (otherPerson === '1') {
            email = "demo@aa.io"
            password = "LhO&FBO$zz"
        } else if (otherPerson === '2') {
            email = 'marnie@aa.io'
            password = 'Thdn&4jK3$'
        } else if (otherPerson === '3') {
            email = 'bobbie@aa.io'
            password = 'lksdjIUjbwEF8$'
        } else {
            email = "demo@aa.io"
            password = "LhO&FBO$zz"
        }
      
        setOtherPerson(currentUser.id)

       

        await dispatch(
            thunkLogin({
              email,
              password,
            })
          );

          setUser(currentUser.id)
          setConvoArr()
    }

    
    
    const sendMessage = (e) => {
        e.preventDefault()
        
        
        const newMessage = {
            message: message
        }
        
        dispatch(createMessageThunk(otherPerson, newMessage))
    }
    
   
    if (!messages) return null;
    if (!users) return null;
    if (!currentUser) return null;
    if (!convoArr) return null;
    console.log(convoArr)
    console.log(otherPerson)
    return (
        <div id="message-center">
            <h2 id="message-header">Message Center</h2>
            <button
            id="new-log-in"
            onClick={logIn}
            >Login As Conversation Partner</button>
            <select
            id="convo-select"
            value={otherPerson}
            onChange={((e) => setOtherPerson(e.target.value))}
            >
                <option>Chose Conversation</option>
                {users ? users.map((user) => (
                    <option key={user.id} disabled={currentUser.id === user.id} value={user.id}>{user.username}</option>
                )) : null}
            </select>
            <div
            id="input"
           
            >
                {convoArr ? convoArr.map((convo) => (
                    <div key={convo.id} className="message-card">
                    {convo.sender_id === currentUser.id ? <p>Me:</p> : <p>Sender Id: {convo.sender_id}</p>}

                    {edit && messId === convo.id? <input value={message} onChange={((e) => setMessage(e.target.value))}/>: <p id="convo-message">{convo.message}</p>}
                    <div className="message-button-container">
                <div className={convo.sender_id === currentUser.id ?"message-buttons" : "hide"}>

                    {/* <OpenModalMenuItem 
                    
                    itemText="Delete"
                     modalComponent={<DeleteMessage messageId={convo.id}/>}
                    /> */}
                    <button className={edit ? "hide" : "edit-button"} disabled={edit} onClick={makeDelete}>Delete</button>
                    <button className={yesOrNo ? "delete-confirmation" : "hide"} onClick={() => handleDelete(convo.id)}>Yes Delete?</button>
                    <button className={yesOrNo ? "delete-confirmation" : "hide"} onClick={() => setYesOrNo(false)}>NO! Cancel!</button>
                

                    <div className={convo.sender_id === currentUser.id ?"message-buttons" : "hide"}>

                        <button className={edit ? "hide" : "edit-button"} disabled={edit} onClick={() => makeEdit(convo.id, convo.message)}>Edit</button>

                        <button className={!edit ? "hide" : "save-button"}disabled={!edit} onClick={() => saveChange(convo.id)}>Save</button>
                        <p className="edit-message-errors">{error.message? error.message : null}</p>
                          {/* <OpenModalMenuItem 
                    
                    itemText="Edit"
                     modalComponent={<EditMessage messageId={convo.id}/>}
                    /> */}
                    </div>
                </div>
                    </div>
                    </div>
                )) : null}
    
            </div>
            <form
            onSubmit={sendMessage}
            >
                <h4 id="input-label">Message:</h4>
            <textarea
            id="message-input"
            disabled={edit}
            value={edit ? '' : message}
            onChange={((e) => setMessage(e.target.value))}
            ></textarea>
            <button
             id="message-submit"
            type="submit">Send</button>
            </form>
     
        </div>
    )
}

export default MessageCenter
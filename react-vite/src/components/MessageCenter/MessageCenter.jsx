import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createMessageThunk, getMessagesThunk } from "../../redux/message"
import { getUsersThunk } from "../../redux/session"
import DeleteMessage from "../DeleteMessage/DeleteMessage"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"

import "./MessageCenter.css"

function MessageCenter() {
    const [message, setMessage] = useState()
    const [otherPerson, setOtherPerson] = useState()
    const [convoArr, setConvoArr] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])
    const users = useSelector((state) => state.session.allUsers)
    const messages = useSelector((state) => state.message.Messages)
    // console.log(users, "USERS")
    // console.log(messages, "MESSAGES")
    useEffect(() => {
        dispatch(getMessagesThunk())
    }, [dispatch])

    useEffect(() => {

    }, [users, messages, otherPerson, convoArr])

    if (!messages) return null;
    if (!users) return null;

  
    
    const otherPersonFunc = (e) => {
        setOtherPerson(e.target.value)
        let tempArr;
        // console.log("HELO FROM OTHERPERSONFUNK")
        tempArr = []
        messages.forEach((message) => {
                
            if (message.sender_id.toString() === otherPerson || message.receiver_id.toString() === otherPerson) {
                
                // console.log(message)
                tempArr.push(message)
                
            }
            return
        })
        setConvoArr(tempArr)
    }
    
    const sendMessage = (e) => {
        e.preventDefault()
        
        
        const newMessage = {
            message: message
        }
        // console.log(otherPerson)
        dispatch(createMessageThunk(otherPerson, newMessage))
    }
    
   

    return (
        <div id="message-center">
            <h2 id="message-header">Message Center</h2>
            <select
            id="convo-select"
            value={otherPerson}
            onChange={((e) => otherPersonFunc(e))}
            >
                <option>Chose Conversation</option>
                {users ? users.map((user) => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                )) : null}
            </select>
            <div
            id="input"
            >
                {convoArr ? convoArr.map((convo) => (
                    <div key={convo.id} className="message-card">
                    <p>Sender Id: {convo.sender_id}</p>
                    <p >{convo.message}</p>
                    <OpenModalMenuItem 
                    
                    itemText="Delete"
                     modalComponent={<DeleteMessage messageId={convo.id}/>}
                    />
                    </div>
                )) : null}
    
            </div>
            <form
            onSubmit={sendMessage}
            >
            <textarea
            id="message-input"
            value={message}
            onChange={((e) => setMessage(e.target.value))}
            ></textarea>
            <button
             
            type="submit">Send</button>
            </form>
     
        </div>
    )
}

export default MessageCenter
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createMessageThunk, getMessagesThunk } from "../../redux/message"
import { thunkLogin, thunkLogout } from "../../redux/session"
import { getUsersThunk } from "../../redux/session"
import DeleteMessage from "../DeleteMessage/DeleteMessage"
import EditMessage from "../EditMessage/EditMessage"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"

import "./MessageCenter.css"

function MessageCenter() {
    const [message, setMessage] = useState()
    const [otherPerson, setOtherPerson] = useState()
    const [convoArr, setConvoArr] = useState()
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    const ref = useRef(null)

 

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])
    const userState = useSelector((state) => state.session)
    const users = userState.allUsers
    const currentUser = userState.user
    const messageState = useSelector((state) => state.message)
    const messages = messageState.Messages
    const newMessage = messageState.newMessage
    // console.log(users, "USERS")
    // console.log(messages, "MESSAGES")
    
    const scroller = () => {
        if (ref.current) {
            ref.scrollIntoView({behavior: "smooth"})
        }
    }
    useEffect(() => {
        dispatch(getMessagesThunk())
    }, [newMessage, otherPerson, dispatch])

    useEffect(() => {

    }, [users, user])

    useEffect(() => {
        let tempArr;
        // console.log("HELO FROM OTHERPERSONFUNK")
        tempArr = []
        
        otherPerson ? messages.forEach((message) => {
            // console.log(message)
            // console.log(otherPerson)
            if (message.sender_id.toString() === otherPerson || message.receiver_id.toString() === otherPerson) {
                
                
                tempArr.push(message)
                
            }
            return
        }) : null

       
        setConvoArr(tempArr)
       }, [otherPerson, messages])

       dispatch(thunkLogout)
        
       const logIn = async (e) => {

        setUser(otherPerson)

        e.preventDefault()
            let email;
            let password;
        if (otherPerson === '1') {
            email = "demo@aa.io"
            password = "LhO&FBO$zz"
        } else if (otherPerson === '2') {
            email = 'marnie@aa.io'
            password = 'Thdn&4jK3$'
        } else {
            email = 'bobbie@aa.io'
            password = 'lksdjIUjbwEF8$'
        }
      
        setOtherPerson(currentUser.id)
        
        await dispatch(
            thunkLogin({
              email,
              password,
            })
          );

        
          
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
            ref={scroller}
            id="input"
           
            >
                {convoArr ? convoArr.map((convo) => (
                    <div key={convo.id} className="message-card">
                    {convo.sender_id === currentUser.id ? <p>Me:</p> : <p>Sender Id: {convo.sender_id}</p>}
                    <p >{convo.message}</p>
                    <div className="message-button-container">
                    <div className={convo.sender_id === currentUser.id ?"message-buttons" : "hide"}>
                    <OpenModalMenuItem 
                    
                    itemText="Delete"
                     modalComponent={<DeleteMessage messageId={convo.id}/>}
                    />
                    </div>
                    <div className={convo.sender_id === currentUser.id ?"message-buttons" : "hide"}>
                          <OpenModalMenuItem 
                    
                    itemText="Edit"
                     modalComponent={<EditMessage messageId={convo.id}/>}
                    />
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
            value={message}
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
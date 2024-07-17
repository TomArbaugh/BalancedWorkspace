import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessagesThunk } from "../../redux/message"
import { getUsersThunk } from "../../redux/session"
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

    }, [users, messages])

    if (!messages) return null;
    if (!users) return null;

  
    
    const otherPersonFunc = (e) => {
        setOtherPerson(e.target.value)
        let tempArr;
        // console.log("HELO FROM OTHERPERSONFUNK")
        tempArr = []
        messages.forEach((message) => {
                
            if (message.sender_id.toString() === otherPerson || message.receiver_id.toString() === otherPerson) {
                
                console.log(message)
                tempArr.push(message)
                
            }
        })
        setConvoArr(tempArr)
    }
    
   console.log(convoArr)

    return (
        <div id="message-center">
            <h2 id="message-header">Message Center</h2>
            <select
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
                    <div key={convo.id}>
                    <p>Sender Id: {convo.sender_id}</p>
                    <p >{convo.message}</p>
                    </div>
                )) : null}
  
            </div>
            <textarea
            value={message}
            onChange={((e) => setMessage(e.target.value))}
            ></textarea>
        </div>
    )
}

export default MessageCenter
import { useEffect, useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getMessageIdThunk } from "../../redux/message";
import { editMessageThunk } from "../../redux/message";
import "./EditMessage.css"


function EditMessage({messageId}){
    const dispatch = useDispatch()
    const { closeModal } = useModal() 
    const [message, setMessage] = useState("")
    const [error, setError] = useState({})

    useEffect(() => {
        dispatch(getMessageIdThunk(messageId))
    }, [dispatch, messageId])

    const theMessage = useSelector((state) => state.message.theMessage)
    

    useEffect(() => {
        if (theMessage) {
            setMessage(theMessage.message)
        }
    }, [theMessage])

    const validations = () => {
        const newError = {}
        if (message.length < 1 ||  message.length > 2000) newError.message = "Message must be between 1 and 2000 characters."
        return newError
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const newError = validations()
        if (Object.keys(newError).length > 0){
            setError(newError)
            return;
        }

        const newMessage = {
            message
        }

        await dispatch(editMessageThunk(messageId, newMessage))
      
        closeModal()
    }
    return (
        <div>
            <h1 id="edit-message-header">Edit Message</h1>
            <form
            id="edit-message-form"
            onSubmit={onSubmit}
            >
                <label>
                    <h4>Message</h4>
                    <textarea
                    id="edit-text-area"
                    value={message}
                    onChange={((e) => setMessage(e.target.value))}
                    ></textarea>
                </label>
                <p className="edit-message-errors">{error.message? error.message : null}</p>
                <button id="edit-message-button" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditMessage
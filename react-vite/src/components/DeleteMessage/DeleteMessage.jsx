import { useDispatch } from "react-redux"
import { deleteMessageThunk } from "../../redux/message"
import { useModal } from "../../context/Modal"

function DeleteMessage({messageId}){

    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const deleteMessage = () => {
        dispatch(deleteMessageThunk(messageId))
        closeModal()
 
    }

    const closeTheModal = (e) => {
        e.preventDefault()
        closeModal()
       
    }
    return (
        <div className="delete-message-modal">
        <h1>Are you sure you would like to delete this message?</h1>
        <button className="dont-delete-message-modal-buttons" onClick={closeTheModal}>No</button>
        <button className="delete-message-modal-buttons" onClick={deleteMessage}>Delete Customer</button>
        </div>
    )
}

export default DeleteMessage
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteTicketThunk } from "../../redux/ticket"
import { useModal } from "../../context/Modal"
import "./DeleteTicket.css"

function DeleteTicket() {
    const {ticket_id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {closeModal} = useModal()

    const deleteTicket = () => {
        dispatch(deleteTicketThunk(ticket_id))
        closeModal()
        navigate('/view/tickets/all')
    }

    const closeTheModal = (e) => {
        e.preventDefault()
        closeModal()
       
    }

    return (
        <div className="delete-modal">
        <h1>Are you sure you would like to delete this ticket?</h1>
        <button className="dont-delete-modal-buttons" onClick={closeTheModal}>No</button>
        <button className="delete-modal-buttons" onClick={deleteTicket}>Delete Ticket</button>
        </div>
       
    )
}

export default DeleteTicket
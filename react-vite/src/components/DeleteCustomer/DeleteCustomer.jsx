import { useDispatch } from "react-redux"
import { deleteCustomerThunk } from "../../redux/customer"
import { useModal } from "../../context/Modal"
import "./DeleteCustomer.css"

function DeleteCustomer({customerId}) {
    
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const deleteCustomer = () => {
        dispatch(deleteCustomerThunk(customerId))
        closeModal()
 
    }

    const closeTheModal = (e) => {
        e.preventDefault()
        closeModal()
       
    }

    return (
        <div className="delete-customer-modal">
        <h1>Are you sure you would like to delete this customer?</h1>
        <button className="dont-delete-customer-modal-buttons" onClick={closeTheModal}>No</button>
        <button className="delete-customer-modal-buttons" onClick={deleteCustomer}>Delete Customer</button>
        </div>
       
    )
}

export default DeleteCustomer
import { useDispatch } from "react-redux"
import { deleteMacroThunk } from "../../redux/macro"
import { useModal } from "../../context/Modal"
import "./DeleteMacro.css"

function DeleteMacro({macroId}) {
    
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const deleteMacro = () => {
        dispatch(deleteMacroThunk(macroId))
        closeModal()
 
    }

    const closeTheModal = (e) => {
        e.preventDefault()
        closeModal()
       
    }

    return (
        <div className="delete-macro-modal">
        <h1>Are you sure you would like to delete this Macro?</h1>
        <button className="dont-delete-macro-modal-buttons" onClick={closeTheModal}>No</button>
        <button className="delete-macro-modal-buttons" onClick={deleteMacro}>Delete Macro</button>
        </div>
       
    )
}

export default DeleteMacro
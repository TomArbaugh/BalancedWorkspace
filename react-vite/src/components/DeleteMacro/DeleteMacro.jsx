import { useDispatch } from "react-redux"
import { deleteMacroThunk } from "../../redux/macro"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"
import "./DeleteMacro.css"
import { useEffect } from "react"

function DeleteMacro({macroId}) {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const deleteMacro = async (e) => {
        e.preventDefault()
        const deleted = await dispatch(deleteMacroThunk(macroId))

        if (deleted) {
            closeModal()
 
        }
        
 
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
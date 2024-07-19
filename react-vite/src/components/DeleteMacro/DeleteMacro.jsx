import { useDispatch } from "react-redux"
import { deleteMacroThunk } from "../../redux/macro"
import { useModal } from "../../context/Modal"
import "./DeleteMacro.css"
import { useState } from "react"


function DeleteMacro({macroId}) {
    
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const deleteMacro = () => {
        if (macroId !== 1 && macroId !== '1') {
            // console.log("IN SUCCESS", macroId)
            dispatch(deleteMacroThunk(macroId))
            closeModal()
        } else {
            // console.log(macroId, "IN ERRORS")
            setErrors({"noMac": "This Option Is Permanent"})
            return
        }
       
    }

    const closeTheModal = (e) => {
        e.preventDefault()
        closeModal()
       
    }

    return (
        <div className="delete-macro-modal">
        <h1>Are you sure you would like to delete this Macro?</h1>
        <p className="error-message">{errors.noMac ? errors.noMac : null}</p>
        <button className="dont-delete-macro-modal-buttons" onClick={closeTheModal}>No</button>
        <button className="delete-macro-modal-buttons" onClick={deleteMacro}>Delete Macro</button>
        </div>
       
    )
}

export default DeleteMacro
import { useEffect, useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editMacroThunk, getMacroByIdThunk } from "../../redux/macro";
import "./EditMacro.css"


function EditMacro({macroId}){
    const dispatch = useDispatch()
    const { closeModal } = useModal() 
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [error, setError] = useState({})

    useEffect(() => {
        dispatch(getMacroByIdThunk(macroId))
    }, [dispatch, macroId])

    const macro = useSelector((state) => state.applyMacro.Macro)

    useEffect(() => {
        if (macro) {
            setDescription(macro.description)
            setName(macro.name)
        }
    }, [macro])

    
    const validations = () => {
        const newError = {}
        if (name.length < 2 || name.length > 50) newError.name = "Name must be between 2 and 50 characters."
        if (description.length < 1 || description.length > 2000) newError.description = "Description must be between 1 and 2000 characters."
        return newError
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const newError = validations()
        if (Object.keys(newError).length > 0){
            setError(newError)
            return;
        }

        const newMacro = {
            name,
            description
        }
        if (macroId !== 1 && macroId !== '1') {
        await dispatch(editMacroThunk(newMacro, macro.id))

        closeModal()
    } else {
        // console.log(macroId, "IN ERRORS")
        setError({"noMac": "This Option Is Permanent"})
        return
    }
    }

    if (!macro) return null;
    return (
        <div>
            <h1 id="create-macro-header">Edit Macro</h1>
            <p className="error-message">{error.noMac ? error.noMac : null}</p>
        <form
        className="create-macro-form"
        onSubmit={onSubmit}
        >
         
         <label>
             <h4 className="create-macro-label">Name</h4>
             <input 
        className="create-macro-input"
         value={name}
         onChange={((e) => setName(e.target.value))}
         />
         </label>
         <p className="create-customer-error">{error.name ? error.name : null}</p>
     <label>
         <h4 className="create-macro-label">Description</h4>
         <input 
         className="create-macro-input"
         value={description}
         onChange={((e) => setDescription(e.target.value))}
         />
     </label>
     <p className="create-customer-error">{error.description ? error.description : null}</p>
     <p id={(!description || !name) ? "create-macro-error-message" : "invisi-text"}>Please provide name and description.</p>
         <button 

         id={description && name ? "create-macro-button" : "disabled"}
         type="submit">Edit Macro</button>
        </form>
        </div>
    )
    
}

export default EditMacro
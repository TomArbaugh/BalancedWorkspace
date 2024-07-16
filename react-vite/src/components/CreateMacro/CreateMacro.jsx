import { useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createMacroThunk } from "../../redux/macro";


function CreateMacro(){
    const dispatch = useDispatch()
    const { closeModal } = useModal() 
    const [name, setName] = useState()
    const [description, setDescription] = useState()

    const onSubmit = async (e) => {
        e.preventDefault()

        const macro = {
            name,
            description
        }

        await dispatch(createMacroThunk(macro))

        closeModal()
    }

    return (
        <form
        onSubmit={onSubmit}
        >
         <h1>Create Macro</h1>
         <label>
             <h4>Name</h4>
             <input 
         value={name}
         onChange={((e) => setName(e.target.value))}
         />
         </label>
     <label>
         <h4>Description</h4>
         <input 
         value={description}
         onChange={((e) => setDescription(e.target.value))}
         />
     </label>
         <button type="submit">Create Macro</button>
        </form>
    )
    
}

export default CreateMacro
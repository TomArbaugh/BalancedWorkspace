import { useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createCustomerThunk } from "../../redux/customer";

function CreateCustomer(){
    const dispatch = useDispatch()
    const { closeModal } = useModal() 
    const [name, setName] = useState()
    const [email, setEmail] = useState()


    const onSubmit = async (e) => {
        e.preventDefault()

        const customer = {
            name,
            email
        }

        await dispatch(createCustomerThunk(customer))

        closeModal()
    }

    return (
       <form
       onSubmit={onSubmit}
       >
        <h1>Create Customer</h1>
        <label>
            <h4>Name</h4>
            <input 
        value={name}
        onChange={((e) => setName(e.target.value))}
        />
        </label>
    <label>
        <h4>Email</h4>
        <input 
        value={email}
        onChange={((e) => setEmail(e.target.value))}
        />
    </label>
        <button type="submit">Create Customer</button>
       </form>
    )
}

export default CreateCustomer
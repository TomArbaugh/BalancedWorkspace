import { useEffect, useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editCustomerThunk, getCustomerIdThunk } from "../../redux/customer";
import "./CreateCustomer.css"

function CreateCustomer({customerId}){
    const dispatch = useDispatch()
    const { closeModal } = useModal() 
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [error, setError] = useState({})

    useEffect(() => {
        dispatch(getCustomerIdThunk(customerId))
    }, [dispatch, customerId])

    const customer = useSelector((state) => state.customer.customer)

    useEffect(() => {
        if (customer) {
            setName(customer.name)
            setEmail(customer.email)
        }
    }, [customer])

    const validations = () => {
        const newError = {}
        if (name.length < 2 || name.length > 50) newError.name = "Name must be between 2 and 50 characters."
        if (!email.includes('@')) newError.email = "Please provide a valid email"
        return newError
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const newError = validations()
        if (Object.keys(newError).length > 0){
            setError(newError)
            return;
        }

        const customer = {
            name,
            email
        }

        await dispatch(editCustomerThunk(customer))

        closeModal()
    }

    return (
        <div id="create-customer-div">
        <h1 id="create-customer-header">Create Customer</h1>
       <form
       className="create-customer-form"
       onSubmit={onSubmit}
       >
        <label>
            <h4 className="create-customer-label">Name</h4>
            <input 
        className="create-customer-input"
        value={name}
        onChange={((e) => setName(e.target.value))}
        />
        </label>
        {error.name && <p className="create-customer-error">{error.name}</p>}
    <label>
        <h4 className="create-customer-label">Email</h4>
        <input 
        className="create-customer-input"
        value={email}
        onChange={((e) => setEmail(e.target.value))}
        />
    </label>
    {error.email && <p className="create-customer-error">{error.email}</p>}
        {(!email || !name) && <p id="create-customer-error-message">Please provide name and email.</p>}
        <button 
        id={email && name ? "create-customer-button" : "disabled"}
        type="submit">Create Customer</button>
        
       </form>
       </div>
    )
}

export default CreateCustomer
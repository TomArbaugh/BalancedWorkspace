import { useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createCustomerThunk } from "../../redux/customer";
import "./CreateCustomer.css"

function CreateCustomer(){
    const dispatch = useDispatch()
    const { closeModal } = useModal() 
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [error, setError] = useState({})

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

        let response;
       
        try {
            // console.log("EMAIL", email)
            // console.log("NAME", name)
            response = await fetch(`/api/customers/validate/${email}/${name}`)
            if (!response.ok) {
                // const cust = await response.json()
                // console.log("THIS IS THE RESPONSE", response)
                setError({"unique": "Email Already Exists"})
            } else {
                await dispatch(createCustomerThunk(customer))
                closeModal()
            }
        } catch (e) {
            console.log(" ")
        }
        
        

        
    }

    return (
        <div id="create-customer-div">
        <h1 id="create-customer-header">Create Customer</h1>
        <p id="unique" className="create-customer-error">{error.unique ? error.unique : null}</p>
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
        <p className="create-customer-error">{error.name ? error.name : null}</p>
    <label>
        <h4 className="create-customer-label">Email</h4>
        <input 
        className="create-customer-input"
        value={email}
        onChange={((e) => setEmail(e.target.value))}
        />
    </label>
    <p className="create-customer-error">{error.email ? error.email : null}</p>
        <p id={(!email || !name) ? "create-customer-error-message" : "invisi-text"}>Please provide name and email.</p>
        <button 
        id={email && name ? "create-customer-button" : "disabled"}
        type="submit">Create Customer</button>
        
       </form>
       </div>
    )
}

export default CreateCustomer
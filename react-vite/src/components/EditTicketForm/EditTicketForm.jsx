import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketIdThunk, putTicketThunk } from "../../redux/ticket";
import { getCustomerIdThunk, getAllCustomersThunk } from "../../redux/customer";
import { getAllMacrosThunk } from "../../redux/macro";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./EditTicketForm.css"

function EditTicketForm(){

    const dispatch = useDispatch()
    const {ticket_id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTicketIdThunk(ticket_id))
    }, [dispatch, ticket_id])
   // console.log(ticket_id)
    const ticket = useSelector((state) => state.ticket.ticketById)
    // console.log(ticket.title)
    const customer = useSelector((state) => state.customer)
    const user = useSelector((state) => state.session.user)
    const macros = useSelector((state) => state.applyMacro)
    const newMac = macros.CreatedMac
    const editedMac = macros.NewMac
    const newCustomer = customer.CreatedCustomer
    const editedCustomer = customer.newCustomer

    useEffect(() => {
        dispatch(getAllMacrosThunk())
    }, [dispatch, newMac, editedMac])

    useEffect(() => {
        dispatch(getAllCustomersThunk())
    }, [dispatch, newCustomer, editedCustomer])
    
    

   
    useEffect(() => {

    }, [customer])

    let requesterId; 
    ticket ? requesterId = ticket.requester : null

        useEffect(() => {

        }, [macros])

       useEffect(() => {

        dispatch(getCustomerIdThunk(requesterId))

       }, [dispatch, requesterId])
      
    

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [title, setTitle] = useState()
    const [assignee, setAssignee] = useState("No Assignees")
    const [type, setType] = useState("Question")
    const [priority, setPriority] = useState("Low")
    const [apply_macro, setApplyMacro] = useState("No Macros")
    const [description, setDescription] = useState()
    const [requester, setRequester] = useState("No Customer")
    const [errors, setErrors] = useState({})
  
    useEffect(() => {
        if (ticket) {
           
            setTitle(ticket.title)
            setAssignee(ticket.assignee)
            setType(ticket.type)
            setPriority(ticket.priority)
            setApplyMacro(ticket.apply_macro)
            setDescription(ticket.description)
            setRequester(ticket.requester)
        }
    }, [ticket])

    const validateForm = () => {
        const newErrors = {}
        if (!title || title.length < 1 || title.length > 40) newErrors.title = "Title must be between 1 and 40 characters."
        if (!requester) newErrors.requester = "Requester is required."
        if (!description || description.length < 3 || description.length > 2000) newErrors.description = "Description must be between 3 and 2000 characters."
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        if (!image) setImage('noImage')
        
        // console.log(apply_macro, "apply macro")
        // const formData = new FormData();
        // formData.append("image", image);
        // console.log(image, "formData jsx")
        const newTicket = {
            title,
            assignee,
            type,
            priority,
            apply_macro,
            requester,
            description 
        }

       
        // console.log("IMAGE", image)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        // console.log(newTicket, "NEW TICKET ON EDIT ")
        setImageLoading(true);
        await dispatch(putTicketThunk(image, newTicket, ticket_id));
        // history.push("/images");
        navigate(`/view/ticket/${ticket_id}`)
    }
    // ...

   
    if (Object.keys(customer).length === 0 || !customer.customer) return null 
    if (!ticket) return null
    if (!customer.allCustomers) return null
    if (!macros) return  null
return (
    <form 
    onSubmit={handleSubmit}
    encType="multipart/form-data"
    id="ticket-form"
>
    <div id="ticket-top">
    <div id="ticket-left-panel">
<label >
    <h4>Requester</h4>
        
    <select
    className="edit-ticket-requester"
    value={requester}
    onChange={((e) => setRequester(e.target.value))}
    >
        <option>{customer.customer.name}</option>
        {customer ? customer.allCustomers.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
        )) : null}
    </select>
    </label>
    <p className="error-message">{errors.requester ? errors.requester : null}</p>
    <label >
        <h4>Assignee</h4>
       
    <select
    className="edit-ticket-assignee"
    value={user.username}
    onChange={((e) => setAssignee(e.target.value))}
    >
        <option>{user.username}</option>
    </select>
    </label>
    <div id="type-priority">
    <label id="type">
        <h4>Type</h4>
        
    <select
    className="edit-ticket-type"
    value={type}
    onChange={((e) => setType(e.target.value))}
    >
        <option>Question</option>
        <option>Incident</option>
        <option>Problem</option>
        <option>Task</option>
    </select>
    </label>
    <lable >
        <h4>Priority</h4>
         
        <select
        className="edit-ticket-priority"
        value={priority}
        onChange={((e) => setPriority(e.target.value))}
        >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
        </select>
    </lable>
    </div>
    </div>
    <div id="ticket-middle-panel">
    <label className="edit-ticket-title">
        <h4>Title</h4>
        
        <input 
        value={title}
        onChange={((e) => setTitle(e.target.value))}
        id="ticket-title-input"
        />
    </label>
    <p className="error-message">{errors.title ? errors.title : null}</p>
    <label>

    </label>
    <label className="edit-ticket-description">
        <h4>Description</h4>
        
        <textarea
        value={description}
        onChange={((e) => setDescription(e.target.value))}
        id="ticket-description-input"
        > 
        </textarea>
    </label>
    <p className="error-message">{errors.description ? errors.description : null}</p>
    </div>
    <div id="edit-ticket-right">
    <lable className="edit-ticket-image">
        <h4>Image Upload</h4>
        
        <input
        
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
    />
    </lable>
    <img 
    id="edit-ticket-image"
    src={ticket.tickets_images[0].image} />
    </div>
    </div>
    <div id="ticket-bottom">
    <lable className="edit-ticket-macro">
        <h4>Apply Macro</h4>
       
        <select
        value={apply_macro}
        onChange={((e) => setApplyMacro(e.target.value))}
        id="macros-input"
        >    
        <option>No Macro</option>

        {macros ? macros.macros.map((macro) => (
            <option 
            key={macro.id} value={macro.id}>{macro.description}</option>
           )) : null}
        </select>
    </lable>
    <button className="edit-ticket-button" type="submit">Submit Ticket</button>
    {(imageLoading)&& <p>Loading...</p>}
    </div>
</form>
)
}


export default EditTicketForm
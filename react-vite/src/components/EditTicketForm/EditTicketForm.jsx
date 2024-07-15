import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketIdThunk, putTicketThunk } from "../../redux/ticket";
import { getCustomerIdThunk } from "../../redux/customer";
import { getMacroIdThunk } from "../../redux/macro";
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
    useEffect(() => {
        dispatch(getMacroIdThunk())
    }, [dispatch])
    
    const customer = useSelector((state) => state.customer)
    const user = useSelector((state) => state.session.user)
    const macros = useSelector((state) => state.applyMacro)

   
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
    const [newDescription, setNewDescription] = useState()
  
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        description = description.concat(' ', newDescription)
        console.log(description)
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
        console.log(newTicket)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        console.log(newTicket, "NEW TICKET ON EDIT ")
        setImageLoading(true);
        await dispatch(putTicketThunk(image, newTicket, ticket_id));
        // history.push("/images");
        navigate(`/view/ticket/${ticket_id}`)
    }
    // ...

   
    if (Object.keys(customer).length === 0) return null 
    if (!ticket) return null
    
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
    value={customer.customer.name}
    
    >
        <option>{customer.customer.name}</option>
    </select>
    </label>
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
    <label>
        <h4 id="ticket-description">{description}</h4>
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
        {macros.macros.map((macro) => (
            <option key={macro.id} value={macro.id}>{macro.name}</option>
           ))}
        </select>
    </lable>
    <button className="edit-ticket-button" type="submit">Submit Ticket</button>
    {(imageLoading)&& <p>Loading...</p>}
    </div>
</form>
)
}


export default EditTicketForm
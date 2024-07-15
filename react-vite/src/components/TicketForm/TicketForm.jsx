import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTicketThunk } from "../../redux/ticket";
import "./TicketForm.css"
import { getAllCustomersThunk } from "../../redux/customer";
import { getMacroIdThunk } from "../../redux/macro";
import { useNavigate } from "react-router-dom";

function TicketForm(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
 

    useEffect(() => {
        dispatch(getMacroIdThunk())
    }, [dispatch])

    const user = useSelector((state) => state.session.user)
    const customers = useSelector((state) => state.customer)
    const macros = useSelector((state) => state.applyMacro)
    useEffect(() => {

    }, [customers, user])

    useEffect(() => {
        dispatch(getAllCustomersThunk())
    }, [dispatch])
  
    // console.log(user.username)

    // console.log("CUSTOMERS", customers)

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [title, setTitle] = useState()
    const [assignee] = useState(user.id)
    const [type, setType] = useState("Question")
    const [priority, setPriority] = useState("Low")
    const [apply_macro, setApplyMacro] = useState()
    const [description, setDescription] = useState()
    const [requester, setRequester] = useState()


        
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("image", image);
        // console.log(image, "formData jsx")
        console.log(apply_macro)
      
        const newTicket = {
            title,
            assignee,
            type,
            priority,
            apply_macro,
            requester,
            description
        }
        // console.log("apply-macro", apply_macro)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(postTicketThunk(image, newTicket));
        // history.push("/images");
        navigate('/view/tickets/all')
    }
    // ...
    
    if (Object.keys(customers).length === 0) return null;
    if (!user) return null;
    if (!macros) return  null
return (
    <form 
    onSubmit={handleSubmit}
    encType="multipart/form-data"
    id="create-ticket-form"
>
    <div id="create-ticket-top">
    <div id="create-ticket-left-panel">
<label >
    <h4>Requester</h4>
        
    <select
    className="create-ticket-requester"
    value={requester}
    onChange={((e) => setRequester(e.target.value))}
    >
        {customers ? customers.allCustomers.map((customer) => (
            <option key={customer.id}>{customer.id}</option>
        )) : null}
        
    </select>
    </label>
    <label >
        <h4>Assignee</h4>
       
    <input
    className="create-ticket-assignee"
    value={user.username}
    disabled={true}
    />
 
    </label>
    <div id="create-type-priority">
    <label id="type">
        <h4>Type</h4>
        
    <select
    className="create-ticket-type"
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
        className="create-ticket-priority"
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
    <div id="create-ticket-middle-panel">
    <label className="edit-ticket-title">
        <h4>Title</h4>
        
        <input 
        value={title}
        onChange={((e) => setTitle(e.target.value))}
        id="create-ticket-title-input"
        />
    </label>
    <label>
    <h4 id="ticket-description">{description}</h4>
    </label>
    <label className="create-ticket-description">
        <h4>Description</h4>
        
        <input 
        value={description}
        onChange={((e) => setDescription(e.target.value))}
        id="create-ticket-description-input"
        />
    </label>
    </div>
    <div id="create-ticket-right">
    <lable className="create-ticket-image">
        <h4>Image Upload</h4>
        
        <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
    />
    </lable>
    </div>
    </div>
    <div id="create-ticket-bottom">
    <lable className="create-ticket-macro">
        <h4>Apply Macro</h4>
       
        <select
        value={apply_macro}
        onChange={((e) => setApplyMacro(e.target.value))}
        id="create-macros-input"
        >
      {macros.macros.map((macro) => (
            <option key={macro.id}>{macro.id}</option>
           ))}
        </select>
    </lable>
    <button className="create-ticket-button" type="submit">Submit Ticket</button>
    {(imageLoading)&& <p>Loading...</p>}
    </div>
</form>
)
}


export default TicketForm
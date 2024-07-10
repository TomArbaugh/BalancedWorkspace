import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTicketThunk } from "../../redux/ticket";


function TestForm(){
    const dispatch = useDispatch()

  
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [title, setTitle] = useState()
    const [assignee, setAssignee] = useState()
    const [type, setType] = useState()
    const [priority, setPriority] = useState()
    const [applyMacro, setApplyMacro] = useState()
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        const newTicket = {
            title,
            assignee,
            type,
            priority,
            applyMacro,
        }
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(postTicketThunk(formData, newTicket));
        history.push("/images");
    }
    // ...
    
return (
    <form 
    onSubmit={handleSubmit}
    encType="multipart/form-data"
>
    <label>
        Title
        <input 
        id='title'
        value={title}
        onChange={((e) => setTitle(e.target.value))}
        />
    </label>
    <label>
        Type
    <select
    value={type}
    onChange={((e) => setType(e.target.value))}
    >
        <option>Question</option>
        <option>Incident</option>
        <option>Problem</option>
        <option>Task</option>
    </select>
    </label>
    <lable>
        Priority 
        <select
        value={priority}
        onChange={((e) => setPriority(e.target.value))}
        >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
        </select>
    </lable>
    <lable>
        Image Upload
        <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
    />
    </lable>
    <label>
        Assignee
    <select
    value={customer.user_id}
    onChange={((e) => setAssignee(e.target.value))}
    >
        <option>No Assignees</option>
    </select>
    </label>
    <lable>
        Apply Macro
        <select
        value={applyMacro}
        onChange={((e) => setApplyMacro(e.target.value))}
        >
            <option>No Macros</option>
        </select>
    </lable>
    <button type="submit">Submit Ticket</button>
    {(imageLoading)&& <p>Loading...</p>}
</form>
)
}


export default TestForm
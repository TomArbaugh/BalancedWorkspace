import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTicketThunk } from "../../redux/ticket";


function TestForm(){
    const dispatch = useDispatch()

  
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [title, setTitle] = useState()
    const [assignee, setAssignee] = useState("No Assignees")
    const [type, setType] = useState("Question")
    const [priority, setPriority] = useState("Low")
    const [apply_macro, setApplyMacro] = useState("No Macros")
    const [description, setDescription] = useState()
    const [requester, setRequester] = useState("No Customer")
        
    const handleSubmit = async (e) => {
        e.preventDefault();
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
        setImageLoading(true);
        await dispatch(postTicketThunk(image, newTicket));
        // history.push("/images");
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
    <label>
        Description
        <input 
        value={description}
        onChange={((e) => setDescription(e.target.value))}
        />
    </label>
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
    value={assignee}
    onChange={((e) => setAssignee(e.target.value))}
    >
        <option>No Assignees</option>
    </select>
    </label>
    <label>
        Requester
    <select
    value={requester}
    onChange={((e) => setRequester(e.target.value))}
    >
        <option>No Customer</option>
    </select>
    </label>
    <lable>
        Apply Macro
        <select
        value={apply_macro}
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
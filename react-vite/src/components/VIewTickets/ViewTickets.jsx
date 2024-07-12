import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketIdThunk } from "../../redux/ticket";
import { useParams } from "react-router-dom";



function ViewTickets(){
    const {ticket_id} = useParams()
    const dispatch = useDispatch()
 



    useEffect(() => {

        dispatch(getTicketIdThunk(ticket_id))

    }, [dispatch, ticket_id])
   // console.log(ticket_id)
    // console.log(ticket.title)
    

 const ticket = useSelector((state) => state.ticket.ticketById)
    



   

   
if (!ticket) return null
return (
    <div>
    <label>
        Title
        <p>
        {ticket.title}
        
        </p>
    </label>
    <label>
        Type
<p>{ticket.type}</p>
    </label>
    <lable>
        Priority 
<p>{ticket.priority}</p>
    </lable>
    <label>
        Description
<p>{ticket.description}</p>
    </label>
    <lable>
        Image 
<p>{ticket.image}</p>
    </lable>
    <label>
        Assignee
<p>{ticket.assignee}</p>
    </label>
    <label>
        Requester
<p>{ticket.requester}</p>
    </label>
    <lable>
        Apply Macro
        <p>{ticket.apply_macro}</p>
    </lable>
</div>
)
}

export default ViewTickets
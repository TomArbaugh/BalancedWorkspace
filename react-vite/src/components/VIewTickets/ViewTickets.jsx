import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketIdThunk } from "../../redux/ticket";
import { useParams } from "react-router-dom";
import { getCustomerIdThunk } from "../../redux/customer";
import { getMacroIdThunk } from "../../redux/macro";
import { Link } from "react-router-dom";
import "./ViewTickets.css"



function ViewTickets(){
    const {ticket_id} = useParams()
    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getTicketIdThunk(ticket_id))

    }, [dispatch, ticket_id])
   // console.log(ticket_id)
    // console.log(ticket.title)
    useEffect(() => {
        dispatch(getMacroIdThunk())
    }, [dispatch])
    
    const customer = useSelector((state) => state.customer)
    const ticket = useSelector((state) => state.ticket.ticketById)
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
      
    

if (Object.keys(customer).length === 0) return null 
if (!ticket) return null

if (!macros) return  null

return (
    <div id="view-ticket-form">
        <div id="view-ticket-top">
            <div id="view-ticket-left">
         <label>
            <h4>Requester</h4>
        
<input
className="view-ticket-requester"
disabled={true}
value={customer ? customer.customer.name : null}
/>
    </label>
    <label>
        <h4> Assignee</h4>
       
<input
className="view-ticket-assignee"
disabled={true}
value={ticket.assignee}
/>
    </label>
    <div id="view-type-priority">
    <label>
        <h4>Type</h4>
        
<input 
className="view-ticket-type"
disabled={true}
value={ticket.type}
/>
    </label>
    <lable>
        <h4>Priority</h4>
        
<input 
className="view-ticket-priority"
disabled={true}
value={ticket.priority}
/>
    </lable>
    </div>
    </div>
    <div id="view-ticket-middle">
    <label>
        <h4>Title</h4>
        
        <input
        id="view-ticket-title-input"
        value={ticket.title}
        disabled={true}
        />
    </label>
   <lable> <h4 id="view-ticket-description">{ticket.description}</h4></lable>
    <label>
       
        <h4>Description</h4>
<input 
id="view-ticket-description-input"
disabled={true}
value={ticket.description}
/>
    </label>
    </div>
    <div id="view-ticket-right">
    <label>
        <h4>Image</h4>
       
        <img 
        id="view-ticket-image"
        src={ticket.tickets_images[0].image} />
    </label>
    </div>
    </div>
    <div id="view-ticket-bottom">
    <lable>
        <h4>Apply Macro</h4>
        
        <input
        id="view-macros-input"
        disabled={true}
        value={ticket.apply_macro}
        />
    </lable>
    <Link to={`/edit/ticket/${ticket.id}`}
    className="view-ticket-button">Edit</Link>
    </div>

</div>
)
}

export default ViewTickets
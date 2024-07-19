import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketIdThunk } from "../../redux/ticket";
import { useParams } from "react-router-dom";
import { getCustomerIdThunk } from "../../redux/customer";
import { getAllMacrosThunk } from "../../redux/macro";
import { Link } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteTicket from "../DeleteTicket/DeleteTicket";
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
        dispatch(getAllMacrosThunk())
    }, [dispatch])
    
    const customer = useSelector((state) => state.customer)
    const ticket = useSelector((state) => state.ticket.ticketById)
    const macros = useSelector((state) => state.applyMacro)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {

    }, [customer])

    let requesterId; 
    ticket ? requesterId = ticket.requester : null

        useEffect(() => {

        }, [macros])

       useEffect(() => {

        dispatch(getCustomerIdThunk(requesterId))

       }, [dispatch, requesterId])
      


if (Object.keys(customer).length === 0 || !customer) return null 
if (!ticket) return null
if (!user) return null
if (!macros) return  null

// let chosenMacro;
// if (ticket.apply_macro) {
   
//     macros ? chosenMacro = macros.macros.find((macro) => macro.id === ticket.apply_macro) : null
// } else {
//     chosenMacro = "No Macro Chosen"
// }

return (
    <div id="view-ticket-form">
        <div id="view-ticket-top">
            <div id="view-ticket-left">
         <label>
            <h4>Requester</h4>
        
<input
className="view-ticket-requester"
disabled={true}
value={customer.customer ? customer.customer.name : null}
/>
    </label>
    <p className="error-message"></p>
    <label>
        <h4> Assignee</h4>
       
<input
className="view-ticket-assignee"
disabled={true}
value={user.username}
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
    <p className="error-message"> </p>
   <lable> </lable>
    <label>
       
        <h4>Description</h4>
<input 
id="view-ticket-description-input"
disabled={true}
value={ticket.description}
/>
    </label>
    <p className="error-message"> </p>
    </div>
    <div id="view-ticket-right">
    <label>
        <h4>Image</h4>
       
        <img 
        id="view-ticket-image"
        src={ticket.tickets_images[0] ? ticket.tickets_images[0].image : null} />
    </label>
    </div>
    </div>
    <div id="view-ticket-bottom">
    <lable className="view-ticket-macro">
        <h4>Apply Macro</h4>
        
        <select
        id="view-macros-input"
        disabled={true}
        value={ticket.apply_macro}
        >
            <option>{ticket.apply_macro}</option>
        </select>
    </lable>
    <div className="view-delete-edit-buttons">
    <Link to={`/edit/ticket/${ticket.id}`}
    className="view-ticket-button"><button id="inner-button">Edit</button></Link>
    <div className="ticket-delete-button">
     <OpenModalMenuItem 
                    
                    itemText="Delete"
                     modalComponent={<DeleteTicket />}
                    />
                    </div>
    </div>
   
    </div>

</div>
)
}

export default ViewTickets
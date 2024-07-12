import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketIdThunk } from "../../redux/ticket";
import { useParams } from "react-router-dom";
import { getCustomerIdThunk } from "../../redux/customer";
import { getMacroIdThunk } from "../../redux/macro";




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
    <div>
        <lable>
            Customer 
            <input 
            value={customer ? customer.customer.name : null}
            disabled={true}
            />
        </lable>
    <label>
        Title
        <input
        value={ticket.title}
        disabled={true}
        />
    </label>
    <label>
        Type
<input 
disabled={true}
value={ticket.type}
/>
    </label>
    <lable>
        Priority 
<input 
disabled={true}
value={ticket.priority}
/>
    </lable>
    <label>
        Description
<input 
disabled={true}
value={ticket.description}
/>
    </label>
    <lable>
        Image 
<input
disabled={true}
value={ticket.image}
/>
    </lable>
    <label>
        Assignee
<input
disabled={true}
value={ticket.assignee}
/>
    </label>
    <label>
        Requester
<input
disabled={true}
value={ticket.requester}
/>
    </label>
    <lable>
        Apply Macro
        <input
        disabled={true}
        value={ticket.apply_macro}
        />
    </lable>
    <label>
        Image 
        <img src={ticket.tickets_images[0].image} />
    </label>
</div>
)
}

export default ViewTickets
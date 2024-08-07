import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getAllTicketsThunk } from "../../redux/ticket"
import { Link } from "react-router-dom"
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useState } from "react";
import "./DashBoard.css"

function DashBoard () {
    
    const dispatch = useDispatch()
    const [moble] = useState(window.innerWidth < 1310)
    const ticketState = useSelector((state) => state.ticket)
    let tickets; 
    ticketState ? tickets = ticketState.tickets : null
    let deltedTicket;
    ticketState ? deltedTicket = ticketState.DeletedTicket : null
    let editedTicket;
    ticketState ? editedTicket = ticketState.EditedTicket : null
    // console.log(tickets.tickets[0].tickets_images[0].image)

    useEffect(() => {

    }, [ticketState])

    useEffect(() => {
        dispatch(getAllTicketsThunk())
    }, [dispatch, deltedTicket, editedTicket])

  
    if (!tickets || Object.keys(ticketState) < 1) return null

    return (
        <div id="whole-thing">
            <div className="dashboard-header">
            <h1>Dashboard</h1>
            <h4>({tickets.length}) Open Tickets</h4>
            </div>
            
            <div id={ !moble ? "view-tickets-header" : 'hide'}>
            <h3 className="ticket-headers">Id</h3>
            <h3 className="ticket-headers">Subject</h3>
            <h3 className="ticket-headers">Requester</h3>
            
            <h3 className="ticket-headers">Type</h3>
            <h3 className="ticket-headers"> Priority</h3>
            <h3 className="ticket-headers">Image</h3>
            </div>
      
            {tickets.map((ticket) => (
                <div key={ticket.id}
                id="view-ticket-card"
                >
                    <Link 
                    to={`/view/ticket/${ticket.id}`}
                    className="view-ticket-preview">
                    <h4 className="ticket-preview-element">{moble ? <h3>ID:</h3>  : null} {ticket.id}</h4>
                    <h4 className="ticket-preview-element">{moble ? <h3 id="subject">Subject:</h3> : null}{ticket.title}</h4>
                    <h4 className="ticket-preview-element">{moble ? <h3>Requester:</h3> : null}{ticket.requester}</h4>
                    <h4 className="ticket-preview-element">{moble ? <h3>Type:</h3> : null}{ticket.type}</h4>
                    <h4 className="ticket-preview-element">{moble ? <h3>Priority:</h3> : null}{ticket.priority}</h4>
                    {ticket.tickets_images.length ? <img 
                    className="ticket-preview-image"
                    src={ticket.tickets_images[0].image} /> : <MdOutlineImageNotSupported />}
                    {/* {/* <h3>{}</h3> */}
                    </Link>
                </div>
              ))} 
        </div>
       
    )
}

export default DashBoard
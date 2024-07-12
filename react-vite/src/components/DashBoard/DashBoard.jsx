import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getAllTicketsThunk } from "../../redux/ticket"
import { Link } from "react-router-dom"
import { MdOutlineImageNotSupported } from "react-icons/md";

function DashBoard () {
    
    const dispatch = useDispatch()

    const tickets = useSelector((state) => state.ticket.tickets)
    // console.log(tickets.tickets[0].tickets_images[0].image)

    useEffect(() => {
        dispatch(getAllTicketsThunk())
    }, [dispatch])

  
    if (!tickets) return null

    return (
        <div>
            {tickets.map((ticket) => (
                <div key={ticket.id}>
                    <Link>
                    <h3>{ticket.id}</h3>
                    <h3>{ticket.requester}</h3>
                    <h3>{ticket.assignee}</h3>
                    <h3>{ticket.type}</h3>
                    <h3>{ticket.priority}</h3>
                    {ticket.tickets_images.length ? <img src={ticket.tickets_images[0].image} /> : <MdOutlineImageNotSupported />}
                    {/* {/* <h3>{}</h3> */}
                    </Link>
                </div>
              ))} 
        </div>
       
    )
}

export default DashBoard
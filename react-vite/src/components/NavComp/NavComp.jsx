import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateCustomer from "../CreateCustomer/CreateCustomer"
import CreateMacro from "../CreateMacro/CreateMacro"
import MessageCenter from "../MessageCenter/MessageCenter";
import { useState } from "react";
import { FaTicketAlt, FaPlusCircle } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaCog, FaPlus } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdAutoAwesome } from 'react-icons/md';
import { HiInbox } from 'react-icons/hi';
import "./NavComp.css"

export default function NavCom() {

    const [moble] = useState(window.innerWidth < 1400)
    const user = useSelector((state) => state.session.user)

    return (
        <div className={user && !moble ? "navigation-links" : "hide"}>
            <Link
                className={user ? "navigation-link" : "hide"}
                id="ticket-link"
                to="/create/ticket"><FaTicketAlt size={60} style={{
                    background: 'linear-gradient(135deg, #3f51b5, #2196f3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '100px', // size it up to see gradient clearly
                }} /> <FaPlusCircle /></Link>

            <div className="navigation-link" id="customer-link">
                <OpenModalMenuItem
                    itemText={<FaUserPlus size={60} />}
                    modalComponent={<CreateCustomer />}
                />
            </div>

            {/* <Link 
        className={user ? "nav-link" : "hide"}
        to="customer/create">Create Customer</Link> */}

            <div className="navigation-link" >
                <OpenModalMenuItem
                    id="macro-link"
                    itemText={<span><FaCog size={50} /> <FaPlus /></span>}
                    modalComponent={<CreateMacro />}
                />

            </div>
            <Link
                className={user ? "navigation-link" : "hide"}
                to="/view/customers"><FaUser size={60} style={{
                    background: 'linear-gradient(135deg, #3f51b5, #2196f3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '100px', // size it up to see gradient clearly
                }} /></Link>
            <Link
                className={user ? "navigation-link" : "hide"}
                to="/view/macros"><MdAutoAwesome size={60} style={{
                    background: 'linear-gradient(135deg, #3f51b5, #2196f3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '100px', // size it up to see gradient clearly
                }} /></Link>
            {/* <Link 
        className={user ? "nav-link" : "hide"}
        to="macro/create">Create Macro</Link> */}
            <div className="navigation-link">
                <OpenModalMenuItem
                    className="modal-link"
                    itemText={<HiInbox size={60} />}
                    modalComponent={<MessageCenter />}
                />
            </div>
        </div>
    )
}
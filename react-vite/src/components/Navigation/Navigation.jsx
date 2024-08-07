import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { GiTightrope } from "react-icons/gi";
import {useSelector} from "react-redux";
import OpenModalMenuItem from "./OpenModalMenuItem";
import CreateCustomer from "../CreateCustomer/CreateCustomer"
import CreateMacro from "../CreateMacro/CreateMacro"
import MessageCenter from "../MessageCenter/MessageCenter";
import { useState } from "react";


function Navigation() {

  const [moble] = useState(window.innerWidth < 1310)
  const user = useSelector((state) => state.session.user)


  return (
    <ul id="landing-ul">
      <li className="li-landing">
        <NavLink className="text-dec-none" to={!user ? "/" : '/view/tickets/all'}>
          <h1 id="landing-h1">B<GiTightrope />LANCED</h1>
          <h2 id="landing-h2">workspace</h2>
          </NavLink>
          <div className={user && !moble ? "nav-links" : "hide"}>
          <Link 
          className={user ? "nav-link" : "hide"}
          id="create-ticket-link"
          to="/create/ticket">Create Ticket</Link>

          <div className="nav-link" id="create-customer-link">
          <OpenModalMenuItem
        
        itemText="Create Customer"
        modalComponent={<CreateCustomer />}
        />
          </div>
       
          {/* <Link 
          className={user ? "nav-link" : "hide"}
          to="customer/create">Create Customer</Link> */}

          <div className="nav-link" id="create-macro-link">
          <OpenModalMenuItem 
        
        itemText="Create Macro"
        modalComponent={<CreateMacro />}
        />
        
          </div>
          <Link 
          className={user ? "nav-link" : "hide"}
          to="/view/customers">Customers</Link>
           <Link 
          className={user ? "nav-link" : "hide"}
          to="/view/macros">Macros</Link>
          {/* <Link 
          className={user ? "nav-link" : "hide"}
          to="macro/create">Create Macro</Link> */}
          <div className="nav-link">
           <OpenModalMenuItem
        
        itemText="Message Center"
        modalComponent={<MessageCenter />}
        /> 
        </div>
          </div>
      </li>
      <li className="li-landing-two">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;

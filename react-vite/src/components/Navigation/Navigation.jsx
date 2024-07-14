import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { GiTightrope } from "react-icons/gi";
import {useSelector} from "react-redux"
import "./Navigation.css";

function Navigation() {

  const user = useSelector((state) => state.session.user)


  return (
    <ul id="landing-ul">
      <li className="li-landing">
        <NavLink className="text-dec-none" to={!user ? "/" : '/view/tickets/all'}>
          <h1 id="landing-h1">B<GiTightrope />LANCED</h1>
          <h2 id="landing-h2">workspace</h2>
          </NavLink>
          <Link 
          className={user ? "nav-link" : "hide"}
          to="/create/ticket">Create Ticket</Link>
      </li>
      <li className="li-landing">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;

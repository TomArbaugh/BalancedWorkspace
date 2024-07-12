import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { GiTightrope } from "react-icons/gi";
import "./Navigation.css";

function Navigation() {
  return (
    <ul id="landing-ul">
      <li className="li-landing">
        <NavLink className="text-dec-none" to="/">
          <h1 id="landing-h1">B<GiTightrope />LANCED</h1>
          <h2 id="landing-h2">workspace</h2>
          </NavLink>
      </li>
      <div>
        <Link className="nav-links" to="create/ticket">Create Ticket</Link>
      </div>
      <li className="li-landing">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;

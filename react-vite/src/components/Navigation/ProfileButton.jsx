import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import CreateCustomer from "../CreateCustomer/CreateCustomer"
import CreateMacro from "../CreateMacro/CreateMacro"
import MessageCenter from "../MessageCenter/MessageCenter";
import './Navigation.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [moble] = useState(window.innerWidth < 1310)
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  return (
    <>
      <div className="nav-div">
      <button className="profile-buttons" onClick={toggleMenu}>
       {!user && !moble ? "Sign In" : user && !moble ? "Menu" : <RxHamburgerMenu />}
      </button>
      </div>
 
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>Hello: {user.username}</li>
              <li>Id # {user.id}</li>
              <li>{user.email}</li>
              <li>
                <button id="log-out-button" onClick={logout}>Log Out</button>
              </li>
              <div className={user ? "nav-links" : "hide"}>
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
            </>
          ) : (
            <div>
              <div className="modal-profile-links">
              <OpenModalMenuItem
              
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
              </div>
              <div className="modal-profile-links">
              <OpenModalMenuItem
              
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
              </div>
             
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

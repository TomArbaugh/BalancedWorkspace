import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {useNavigate } from "react-router-dom"
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate()

  const demoLogIn = () => {
    setEmail('demo@aa.io');
    setPassword('password');
    return null;
  }



  const handleSubmit = async (e) => {
    e.preventDefault();



    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('view/tickets/all')
    }
  };

  return (
    <>
      <h1 id="log-header">Log In</h1>
      <form 
      id="log-in-form"
      onSubmit={handleSubmit}>
        <label>
          <h4 className="log-labels">Email</h4>
          
          <input
          className="log-inputs"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="log-errors">{errors.email}</p>}
        <label>
          <h4 className="log-labels">Password</h4>
          
          <input
          className="log-inputs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="log-errors">{errors.password}</p>}
        <button
          id="demo-button"
          onClick={() => demoLogIn()}
        >
          Log in as Demo User
        </button>
        <button 
        id="log-in-button"
        type="submit">Log In</button>

      </form>
    </>
  );
}

export default LoginFormModal;

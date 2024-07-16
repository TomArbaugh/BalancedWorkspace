import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const validations = () => {
    const newErrors = {}
    if (password !== confirmPassword) newErrors.confirmPassword = "Confirm Password field must be the same as the Password field"
    if (password.length < 6 || password.length > 20) newErrors.password = "Password must be between 6 and 20 characters."
    if (!email.includes('@')) newErrors.email = "Please provide a valid email"
    if (username.length < 3 || username.length > 30) newErrors.username = "Username must be between 3 and 30 characters"


    return newErrors;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorsFound = validations()
    if (Object.keys(errorsFound).length > 0) {
        setErrors(errorsFound);
        return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div >
      <h1 id="sign-up-header">Sign Up</h1>
      {errors.server && <p className="sign-up-errors">{errors.server}</p>}
      <form 
      id="sign-up-modal"
      onSubmit={handleSubmit}>
        <label>
          <h4 className="sign-up-label">Email</h4>
          
          <input
          className="sign-up-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="sign-up-errors">{errors.email}</p>}
        <label>
          <h4 className="sign-up-label">Username</h4>
          
          <input
          className="sign-up-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="sign-up-errors">{errors.username}</p>}
        <label>
          <h4 className="sign-up-label">Password</h4>
          
          <input
          className="sign-up-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="sign-up-errors">{errors.password}</p>}
        <label>
          <h4 className="sign-up-label">Confirm Password</h4>
          
          <input
          className="sign-up-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="sign-up-errors">{errors.confirmPassword}</p>}
        <button id="sign-up-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;

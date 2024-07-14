import "./LandingPage.css"
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logIn = async (e) => {
        e.preventDefault()
        
        const email = "demo@aa.io"
        const password = "password"

        const serverResponse = await dispatch(
            thunkLogin({
              email,
              password,
            })
          );

          if (serverResponse) {
            setErrors(serverResponse);
          } else {
            navigate('view/tickets/all')
          }
    }

    return (
        <div className="landing-body">
            <div className="landing-top">
            <div className="landing-left">
                <div >
                    <h1 className="landing-h1">Balance Your Work</h1>
                </div>
                <div className="landing-h2">
                    <h2>Join us today and keep your job right side up, your business grinding the rail, and you rest easy knowing you have a balanced workspace</h2>
                </div>
                <div className="landing-button-container">
                    <button 
                    onClick={logIn}
                    className="landing-buttons">Demo Login</button>
                    
                </div>
            </div>
            <div className="landing-right">
                <img className="landing-image" src="https://balancedworkspace.s3.us-west-2.amazonaws.com/9852aa776f384c1d81077156835fd64f.jpg" />
            </div>
            </div>
           
            <div className="landing-bottom">
                <h2>Balanced Workspace</h2>
            </div>
        </div>
        )
}

export default LandingPage
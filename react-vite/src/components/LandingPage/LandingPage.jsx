import "./LandingPage.css"
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function LandingPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    const logIn = async (e) => {
        e.preventDefault()
        
        const email = "demo@aa.io"
        const password = "LhO&FBO$zz"

        await dispatch(
            thunkLogin({
              email,
              password,
            })
          );

        navigate('view/tickets/all')
          
    }

    return (
        <div className="landing-body">
            <div className="landing-top">
            <div className="landing-left">
                <div >
                    <h1 className="landing-h1">Balance Your Work</h1>
                </div>
                <div className="landing-h2">
                    <h2>Join us today and keep your job right side up, your business grinding the rail, and you will rest easy knowing you have a balanced workspace.</h2>
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
                <Link to="https://www.linkedin.com/in/tomarbaugh/"><FaLinkedin className="about-links"/></Link>
                
                <h2>Balanced Workspace</h2>

                <Link to="https://github.com/TomArbaugh/"><FaGithub className="about-links"/></Link>
                
            </div>
        </div>
        )
}

export default LandingPage
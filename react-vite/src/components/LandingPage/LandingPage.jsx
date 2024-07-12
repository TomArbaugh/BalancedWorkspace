import "./LandingPage.css"

function LandingPage() {

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
                    <button className="landing-buttons">Start Free Trial</button>
                    <button className="landing-buttons">Buy Now</button>
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
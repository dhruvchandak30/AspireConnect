import "./Signin.css";
import { useNavigate } from "react-router";

const Signin = () => {
  const navigate = useNavigate();
  const toggleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="page-wrapper">
      <div className="container" id="container">
        <div className={`form-container sign-in-container`}>
          <form action="#" className="flex flex-col justify-between">
            <div className="text-2xl font-bold">Sign in</div>
            <div>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </div>
            <div className="flex flex-col ">
              <a href="#" className="text-[16px]">
                Forgot your password?
              </a>
              <button>Sign In</button>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <div className="text-2xl text-white font-bold">
                Hello Friends!
              </div>
              <p className="p1">
                Enter your personal details and start journey with us
              </p>
              <button className="ghost" onClick={toggleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

import "./Signin.css";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();

  const toggleSignUp = () => {
    navigate("/signin");
  };

  return (
    <div className="page-wrapper">
      <div className="container" id="container">
        <div className="overlay-container1">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="text-2xl text-white font-bold">Welcome Back!</div>
              <p className="p1">
                To keep connected with us please login with your personal
              </p>
              <button className="ghost" onClick={toggleSignUp}>
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className={`form-container sign-up-container`}>
          <form action="#">
            <div className="flex flex-col justify-around gap-6">
              <div className="text-2xl font-bold">Create Account</div>
              <div>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" name="pswd1" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="pswd2"
                />
              </div>
              <div>
                <button type="submit">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

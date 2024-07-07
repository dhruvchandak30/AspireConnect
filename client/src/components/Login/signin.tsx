import { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const toggleSignUp = () => {
    navigate("/signup");
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setWarning("Email and password are required.");
      return;
    }
    // Further authentication logic goes here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="page-wrapper">
      <div className="container" id="container">
        <div className={`form-container sign-in-container`}>
          <form
            onSubmit={formSubmitHandler}
            action="#"
            className="flex flex-col justify-between"
          >
            <div className="text-2xl font-bold">Sign in</div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {warning && <div className="text-red-500">{warning}</div>}
            <div className="flex flex-col ">
              <a href="#" className="text-[16px]">
                Forgot your password?
              </a>
              <button type="submit">Sign In</button>
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
                Enter your personal details and start your journey with us
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

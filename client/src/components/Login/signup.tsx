import { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import url from "../../util";
import { useSetRecoilState } from "recoil";
import { userId } from "../../store/atoms/userId";
import { usernameAtom } from "../../store/atoms/username";

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  journey: string;
  career: string;
  interests: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [nextPage, setshowPage] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [user, setUser] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 0,
    gender: "",
    location: "",
    bio: "",
    journey: "",
    career: "",
    interests: "",
  });

  const setUserId = useSetRecoilState(userId);
  const setUsername = useSetRecoilState(usernameAtom);

  const toggleSignUp = () => {
    navigate("/signin");
  };

  const nextInfoHandler = () => {
    if (validatePage1()) {
      setWarning("");
      setshowPage(true);
    }
  };

  const checkInterests = (interests: string): boolean => {
    let count = 0;
    for (let i = 0; i < interests.length; i++) {
      if (interests[i] === ",") {
        count++;
      }
    }

    return count >= 2;
  };

  const validatePage1 = () => {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      setWarning("All fields are required.");
      return false;
    }
    if (user.password !== user.confirmPassword) {
      setWarning("Passwords do not match.");
      return false;
    }
    return true;
  };

  const validatePage2 = () => {
    if (user.age < 14) {
      setWarning("Age should be greater than 14.");
      return false;
    }
    if (!user.gender) {
      setWarning("Please select a gender.");
      return false;
    }
    if (
      !user.location ||
      !user.bio ||
      !user.journey ||
      !user.career ||
      !user.interests
    ) {
      setWarning("All fields are required.");
      return false;
    }
    if (user.journey.length < 50) {
      setWarning("Journey should be at least 50 words.");
      return false;
    }
    if (!checkInterests(user.interests)) {
      setWarning("Enter at least 3 interests, separated by commas.");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender,
    }));
    setShowDropdown(false);
  };

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePage2()) {
      setWarning("");
      try {
        const response = await fetch(`${url}/storeprofile/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Signup successful:", data);
          if (data.message === "User successfully signed up") {
            console.log(data.user.id, data.user.firstName);
            setUserId(data.user.id);
            setUsername(data.user.firstName);
            navigate("/");
          } else {
            setWarning("Failed to submit form. Please try again later.");
          }
        } else {
          console.error("Signup failed:", response.statusText);
          setWarning("Failed to submit form. Please try again later.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setWarning("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container" id="container">
        <div className="overlay-container1">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="text-2xl text-white font-bold">Welcome Back!</div>
              <p className="p1">
                To keep connected with us please login with Us
              </p>
              <button className="ghost" onClick={toggleSignUp}>
                Sign In
              </button>
            </div>
          </div>
        </div>
        {!nextPage ? (
          <div className="form-container sign-up-container">
            <form className="form1" onSubmit={submitHandler}>
              <div className="flex flex-col justify-around gap-6">
                <div className="text-2xl font-bold">Create Account</div>
                <div>
                  <input
                    className="input1"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="input1"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="input1"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="input1"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="input1"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                {warning && <div className="text-red-500">{warning}</div>}
                <div>
                  <button
                    onClick={nextInfoHandler}
                    type="submit"
                    className="w-full py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    style={{
                      background: "linear-gradient(to right, #ff4b2b, #ff4160)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(to right, #ff4160, #ff4b2b)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(to right, #ff4b2b, #ff4160)")
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="form-container sign-up-container">
            <form className="form1" onSubmit={submitHandler}>
              <div className="flex flex-col justify-around gap-1">
                <div className="text-2xl font-bold">Information</div>
                <div>
                  <input
                    type="number"
                    className="input1 bg-gray-200"
                    min={14}
                    required
                    placeholder="Age"
                    name="age"
                    value={user.age}
                    onChange={handleChange}
                  />

                  <div className="flex flex-row items-center cursor-pointer justify-between bg-gray-200 p-1 px-2">
                    <div className="text-gray-500">Gender</div>
                    <div className="flex flex-col justify-center items-center align-middle">
                      <button
                        type="button"
                        className="bg-white relative text-gray-600 border-0 rounded-none"
                        onClick={toggleDropdown}
                      >
                        {user.gender ? user.gender : "Select Gender"}
                      </button>
                      {showDropdown && (
                        <div className="absolute mt-32 bg-white px-4 py-2">
                          {["Male", "Female", "Other"].map((gender) => (
                            <div
                              key={gender}
                              onClick={() => handleGenderSelect(gender)}
                            >
                              {gender}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    className="input1 bg-gray-200"
                    placeholder="Location"
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="input1 bg-gray-200"
                    placeholder="Bio"
                    name="bio"
                    value={user.bio}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    required
                    className="input1 bg-gray-200"
                    placeholder="Journey (Min 50 words)"
                    name="journey"
                    value={user.journey}
                    onChange={handleChange}
                    minLength={50}
                  />
                  <input
                    type="text"
                    required
                    className="input1 bg-gray-200"
                    placeholder="Career"
                    name="career"
                    value={user.career}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    required
                    className="input1 bg-gray-200"
                    placeholder="Minimum 3 interests, separated by commas."
                    name="interests"
                    value={user.interests}
                    onChange={handleChange}
                  />
                </div>
                {warning && <div className="text-red-500">{warning}</div>}
                <div className="flex flex-row gap-2">
                  <button
                    onClick={nextInfoHandler}
                    type="submit"
                    className="w-full py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    style={{
                      background: "linear-gradient(to right, #ff4b2b, #ff4160)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(to right, #ff4160, #ff4b2b)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(to right, #ff4b2b, #ff4160)")
                    }
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    style={{
                      background: "linear-gradient(to right, #ff4b2b, #ff4160)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(to right, #ff4160, #ff4b2b)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(to right, #ff4b2b, #ff4160)")
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;

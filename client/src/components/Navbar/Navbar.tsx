import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_withoutName.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white border-b-2 flex flex-col lg:flex-row justify-between items-center px-8 border-black shadow-md">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <Link to="/">
          <img src={logo} alt="Aspire" className="w-[3rem]" />
        </Link>
        <button className="lg:hidden text-black" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col lg:flex lg:flex-row gap-8 w-full lg:w-auto`}
      >
        <div>
          <Link
            onClick={toggleMenu}
            to="/"
            className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            onClick={toggleMenu}
            to="/signin"
            className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
          >
            Sign In
          </Link>
        </div>
        <div>
          <Link
            onClick={toggleMenu}
            to="/signup"
            className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
          >
            Sign Up
          </Link>
        </div>
        <div>
          <Link
            onClick={toggleMenu}
            to="/logout"
            className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
          >
            Log Out
          </Link>
        </div>
        <div>
          <Link
            onClick={toggleMenu}
            to="/contact"
            className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

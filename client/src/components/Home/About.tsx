import people from "../../assets/people.jpg";
import { useNavigate } from "react-router";
const About = () => {
  const navigate = useNavigate();
  const tryNowHandler = () => {
    navigate("/");
  };
  return (
    <div className="flex lg:flex-row flex-col items-center p-4 sm:p-8 bg-gray-100 lg:justify-between ">
      <div className="w-full lg:w-1/2">
        <img
          src={people}
          alt="About Us"
          className="lg:w-5/6 rounded-lg shadow-md mb-4 sm:mb-8"
        />
      </div>
      <div className="w-full lg:w-1/2 text-left px-2 sm:px-0 lg:px-8">
        <div className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
          About Aspire Connect
        </div>
        <div className="text-base sm:text-lg mb-4 sm:mb-6">
          AspireConnect is a unique platform to match users based on their
          long-term life goals, career ambitions, family planning, and personal
          growth objectives and their common life journey.
        </div>
        <div className="flex lg:justify-start justify-center">
          <button
            onClick={tryNowHandler}
            className="bg-[#ff416c] text-white py-2 px-4 rounded-lg hover:bg-[#ff4b2b] transition duration-300 "
          >
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

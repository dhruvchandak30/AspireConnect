import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import Completeprofile from "./pages/completeprofile";
import Navbar from "./components/Navbar/Navbar";
import ContactUs from "./components/Contact/ContactUs";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/completeprofile" element={<Completeprofile />} />
      </Routes>
    </Router>
  );
}

export default App;

import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Login from "./views/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./views/Signup/Signup";
import About from "./views/About/About";
import PublicView from "./views/PublicView/PublicView";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

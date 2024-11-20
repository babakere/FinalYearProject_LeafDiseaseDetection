import "./App.css";

import Footer from "./components/footer";
import NavBar from "./components/navBar";
import Detection from "./pages/Detection/detection";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";

import About from "./pages/about/about";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detection" element={<Detection />}></Route>

          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;

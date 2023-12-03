import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Profile, SignIn, SignUp } from "./pages/index";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Sign-In" element={<SignIn />} />
        <Route path="/Sign-Up" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;

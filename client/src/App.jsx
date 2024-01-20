import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Deals,
  About,
  Profile,
  SignIn,
  SignUp,
  Navbar,
  CreateDeal,
  PrivatRoute,
  ScrollToTop,
} from "./components/index";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Deals />} />
        <Route path="/search" element={<Deals />} />
        <Route path="/Sign-In" element={<SignIn />} />
        <Route path="/Sign-Up" element={<SignUp />} />
        <Route element={<PrivatRoute />}>
          <Route path="/create" element={<CreateDeal />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/About" element={<About />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </Router>
  );
};

export default App;

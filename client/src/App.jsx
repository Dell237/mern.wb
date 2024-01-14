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
} from "./components/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDeals } from "./features/api/dealSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeals());
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Deals />} />
        <Route path="/Sign-In" element={<SignIn />} />
        <Route path="/Sign-Up" element={<SignUp />} />
        <Route element={<PrivatRoute />}>
          <Route path="/create" element={<CreateDeal />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/About" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

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
  ForgotPassword,
  ResetPassword,
  Favorites,
  CheckSignUp,
  UserDeal,
  Gutscheine,
} from "./components/index";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Deals />} />
        <Route path="/search" element={<Deals />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Gutscheine" element={<Gutscheine />} />

        <Route path="/SignUp/:id" element={<CheckSignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/forgotPassword/:id" element={<ResetPassword />} />
        <Route element={<PrivatRoute />}>
          <Route path="/create" element={<CreateDeal />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/About" element={<About />} />
          <Route path="/Favorite" element={<Favorites />} />
          <Route path="/Profile/deals" element={<UserDeal />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </Router>
  );
};

export default App;

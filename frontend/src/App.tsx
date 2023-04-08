import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      {loggedIn && (
        <div className="relative z-50 h-12">
          <Navbar className="fixed w-full bg-white" />
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/followers" element={<div>follwers</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

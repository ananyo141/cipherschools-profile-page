import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/followers" element={<div>follwers</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

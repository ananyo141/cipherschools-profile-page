import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";

import { useAppDispatch, useAppSelector } from "./hooks/useReduxHooks";
import { loadLoginInfo } from "./state/features/login/loginSlice";

function App() {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadLoginInfo()).unwrap();
  }, [isLoggedIn]);

  return (
    <div className="App overflow-clip">
      <Router>
        {isLoggedIn && (
          <div className="relative z-50 h-12">
            <Navbar className="fixed w-full bg-white" />
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <ProfilePage /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/followers" element={<div>follwers</div>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import Followers from "./pages/Followers";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";

import { useAppDispatch, useAppSelector } from "./hooks/useReduxHooks";
import { loadLoginInfo } from "./state/features/login/loginSlice";

function App() {
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadLoginInfo()).unwrap();
  }, [isLoggedIn]);

  return (
    <div className="App overflow-clip">
      {isLoading && (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Loading...</h1>
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 "></div>
        </div>
      )}
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
          <Route path="/followers" element={<Followers />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

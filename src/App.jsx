import React from "react";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./page/Profile";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<AuthRoute Component={Signup} />} />
            <Route path='/login' element={<AuthRoute Component={Login} />} />
            <Route
              path='/profile'
              element={<ProtectedRoute Component={Profile} />}
            />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;

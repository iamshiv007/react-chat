import React from "react";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./page/Profile";
import AuthRoute from "./components/AuthRoute";
import Chat from "./page/Chat";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route
              exact
              path='/signup'
              element={<AuthRoute Component={Signup} />}
            />
            <Route
              exact
              path='/login'
              element={<AuthRoute Component={Login} />}
            />
            <Route exact path='/' element={<Home />} />
            <Route
              exact
              path='/profile'
              element={<ProtectedRoute Component={Profile} />}
            />
            <Route exact path='/chat' element={<Chat />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;

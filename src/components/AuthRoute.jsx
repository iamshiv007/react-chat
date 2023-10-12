import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../layout/loading/Loader";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ Component }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        setUser(user);
      } else {
        setLoading(false);
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  useEffect(() => {
    // Use a separate useEffect to handle navigation after rendering.
    if (!loading && user?.email) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  return loading || user?.email ? <Loader /> : <Component />;
};

export default AuthRoute;

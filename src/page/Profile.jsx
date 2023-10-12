import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

// eslint-disable-next-line react/prop-types
const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
        alert("Logged out successfully");
      })
      .catch((error) => {
        // An error happened
        console.log(error);
      });
  };

  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      <p>{user?.email}</p>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;

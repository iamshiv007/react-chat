import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <p>Welcome Home</p>
      <div className='mt-5 flex gap-5'>
        <NavLink className='hover:underline' to='/login'>
          Login
        </NavLink>
        <NavLink className='hover:underline' to='profile'>
          Profile
        </NavLink>
      </div>
    </>
  );
};

export default Home;

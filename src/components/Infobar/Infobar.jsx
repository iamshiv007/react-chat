/* eslint-disable react/prop-types */
import React from "react";
import "./Infobar.css";

const Infobar = ({ room }) => (
  <div className='infoBar'>
    <div className='leftInnerContainer'>
      <h3>{room}</h3>
    </div>
    <div className='rightInnerContainer'>
      <a href='/'>Leave</a>
    </div>
  </div>
);

export default Infobar;

/* eslint-disable react/prop-types */
import React from "react";
import onlineIcon from "../icons/onlineIcon.png";
import "./TextContainer.css";

const TextContainer = ({ users }) => {
  return (
    <div className='textContainer'>
      {users ? (
        <div>
          <h1>People Currently chatting</h1>
          <div className='activeContainer'>
            <h2>
              {users.map(({ name }) => (
                <div key={name} className='activeItem'>
                  {name}
                  <img
                    style={{ width: "44px" }}
                    alt='Online Icon'
                    src={onlineIcon}
                  />
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TextContainer;

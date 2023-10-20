import React from "react";
import { Link } from "react-router-dom";

const AdBox = () => {
  return (
    <div className='w-2/5 border-l-2 px-5'>
      <div className='flex flex-col'>
        <div className='font-semibold text-xl py-4'>Public Group</div>
        <img
          src={
            "https://img.freepik.com/free-photo/friends-looking-each-other-holding-chat-bubble_23-2148342087.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697328000&semt=ais"
          }
          className='border object-cover rounded-xl h-64'
          alt=''
        />
        <Link href='/' className='font-semibold py-4'>
          Explore groups
        </Link>
        <div className='mb-4'>
          Create a global or public group for asking questions, gaining
          knowledge, and sharing your experiences to help others.
        </div>
      </div>
    </div>
  );
};

export default AdBox;

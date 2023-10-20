import React from "react";
import { useChat } from "../../context/ChatContext";

const SelectedUser = () => {
  const { onlineUsers, receiver } = useChat();

  return (
    <div className='w-full flex flex-col'>
      {onlineUsers?.find((user) => user.userName === receiver) && receiver && (
        <div className='px-5 py-2 flex items-center gap-2 border-b-2'>
          <img
            src={`https://api.multiavatar.com/${receiver}.svg`}
            className='object-cover h-10 w-10 rounded-full'
            alt=''
          />
          <p className='text-lg font-semibold'>{receiver}</p>
        </div>
      )}
      {/* <!-- message --> */}
    </div>
  );
};

export default SelectedUser;

import React from "react";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";

const SelectedUser = () => {
  const { receiver } = useChat();

  const { users } = useSelector((state) => state.users);

  return (
    <div className='w-full flex flex-col'>
      {users?.find((user) => user.userName === receiver) && receiver && (
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

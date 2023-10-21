import React, { useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { getAllUsers } from "../../redux/actions/usersActions";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../redux/reducers/usersReducer";
import Loader from "../../layout/loading/Loader";

const UserList = () => {
  const { setReceiver } = useChat();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <>
      <div className='h-[80vh] flex flex-col w-2/5 border-r-2 overflow-y-scroll'>
        {loading ? (
          <Loader height={"80vh"} />
        ) : users?.length !== 0 ? (
          users
            .filter((myuser) => myuser.userName !== user.userName)
            ?.map((user) => (
              <div
                onClick={() => setReceiver(user.userName)}
                key={user.userName}
                className='flex flex-row gap-2 py-4 px-2 justify-center items-center border-b-2 hover:cursor-pointer'
              >
                <div className='w-1/4'>
                  <img
                    src={`https://api.multiavatar.com/${user.userName}.svg`}
                    className='object-cover h-10 w-10 rounded-full'
                    alt=''
                  />
                </div>
                <div className='w-full'>
                  <div className='text-lg font-semibold'>{user.fullName}</div>
                  {/* <span className='text-gray-500'>Pick me at 9:00 Am</span> */}
                </div>
              </div>
            ))
        ) : (
          <p className='py-4 flex justify-center'>Nobody is online</p>
        )}
      </div>
    </>
  );
};

export default UserList;

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SubmitLoader from "../layout/loading/SubmitLoader";
import { login } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {/* <!-- component --> */}
      {loading && <SubmitLoader />}
      <section className='min-h-screen flex items-stretch text-white '>
        <div
          className='lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center'
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
          }}
        >
          <div className='absolute bg-black opacity-60 inset-0 z-0'></div>
          <div className='w-full px-24 z-10'>
            <h1 className='text-5xl font-bold text-left tracking-wide'>
              Chat freely
            </h1>
            <p className='text-3xl my-4'>
              Share your knowledge and experiences.
            </p>
          </div>
        </div>
        <div
          className='lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0'
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className='absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center'
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
            }}
          >
            <div className='absolute bg-black opacity-60 inset-0 z-0'></div>
          </div>
          <div className='w-full py-6 z-20'>
            <h1 className='text-4xl font-bold'>MERN CHAT</h1>

            <form
              onSubmit={onLogin}
              action=''
              className='sm:w-2/3 w-full px-4 lg:px-0 mx-auto'
            >
              <div className='pb-2 pt-4'>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  required
                  className='block w-full p-4 text-lg rounded-sm bg-black'
                />
              </div>
              <div className='pb-2 pt-4'>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full p-4 text-lg rounded-sm bg-black'
                  type='password'
                  name='password'
                  id='password'
                  required
                  placeholder='Password'
                />
              </div>
              <div className='my-2 flex justify-between'>
                {/* <a href='#'>Forgot your password?</a> */}
                <p className='text-gray-400'>Don&apos;t have an account?</p>
                <NavLink
                  className='hover:underline text-blue-50 hover:text-blue-100'
                  to='/signup'
                >
                  Create Account
                </NavLink>
              </div>
              <div className='px-4 pb-2 pt-4'>
                <button
                  disabled={loading}
                  type='submit'
                  className='uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none'
                >
                  {loading ? "Sending..." : "log in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

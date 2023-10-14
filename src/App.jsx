import React from "react";
// import Home from "./page/Home";
// import Signup from "./page/Signup";
// import Login from "./page/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Profile from "./page/Profile";
// import AuthRoute from "./components/AuthRoute";
// import Chat from "./page/Chat";
// import { socket } from "./socket";
// import { ConnectionState } from "./components/ConnectionState";
// import { Events } from "./components/Events";
// import { ConnectionManager } from "./components/ConnectionManager";
// import { MyForm } from "./components/MyForm";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

function App() {
  // const [isConnected, setIsConnected] = useState(false);
  // const [fooEvents, setFooEvents] = useState([]);

  // useEffect(() => {
  //   // no-op if the socket is already connected
  //   socket.connect();
  //   console.log("hello");
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("Count");

  //   function onFooEvent(value) {
  //     // setFooEvents(fooEvents.concat(value));
  //     setFooEvents((previous) => [...previous, value]);
  //   }

  //   socket.on("foo", onFooEvent);

  //   return () => {
  //     socket.off("foo", onFooEvent);
  //   };
  // }, []);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);

  return (
    <Router>
      <div>
        <section>
          {/* <ConnectionState isConnected={isConnected} />
          <ConnectionManager /> */}
          <Routes>
            <Route exact path='/' element={<Join />} />
            <Route exact path='/chat' element={<Chat />} />
            {/* <Route
              exact
              path='/signup'
              element={<AuthRoute Component={Signup} />}
            />
            <Route
              exact
              path='/login'
              element={<AuthRoute Component={Login} />}
            />
            <Route exact path='/' element={<Home />} />
            <Route
              exact
              path='/profile'
              element={<ProtectedRoute Component={Profile} />}
            /> */}
            {/* <Route exact path='/chat' element={<Chat />} /> */}
          </Routes>
          {/* <Events events={fooEvents} />
          <MyForm /> */}
        </section>
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createMail } from "../redux/actions/mailActions";

// eslint-disable-next-line react/prop-types
const Profile = ({ user }) => {
  const [browserInfo, setBrowserInfo] = useState(null);
  const [ipInfo, setIpInfo] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const fetchIpApi = async () => {
    await axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        setIpInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching IP info:", error);
      });
  };

  const getBrowserName = (userAgent) => {
    if (/opera|opr/i.test(userAgent)) return "Opera";
    if (/chrome|crios/i.test(userAgent)) return "Chrome";
    if (/firefox|fxios/i.test(userAgent)) return "Firefox";
    if (/safari/i.test(userAgent)) return "Safari";
    if (/edge|edg|edgi/i.test(userAgent)) return "Edge";
    if (/ie|trident/i.test(userAgent)) return "Internet Explorer";
    return "Unknown";
  };

  const getOSName = (userAgent) => {
    if (/windows|win/i.test(userAgent)) return "Windows";
    if (/iphone/i.test(userAgent)) return "iOS";
    if (/ipad/i.test(userAgent)) return "iOS";
    if (/mac/i.test(userAgent)) return "macOS";
    if (/android/i.test(userAgent)) return "Android";
    if (/linux/i.test(userAgent)) return "Linux";
    return "Unknown";
  };

  useEffect(() => {
    if (!ipInfo?.ip) {
      console.log("namaste");
      console.log(ipInfo);
      fetchIpApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("hello2");
    console.log(ipInfo);
    const userAgent = window.navigator.userAgent;
    const browserName = getBrowserName(userAgent);
    const osName = getOSName(userAgent);
    setBrowserInfo({ browserName, osName });
    if (ipInfo) {
      console.log("hello");
      console.log(ipInfo);
      dispatch(
        createMail({
          // eslint-disable-next-line react/prop-types
          name: user.displayName || user.email,
          // eslint-disable-next-line react/prop-types
          email: user.email,
          subject: `New visitor from ${ipInfo?.country_name}`,
          message: `Location: ${ipInfo?.city}, ${ipInfo?.region}, ${ipInfo?.country_name}, Operating System: ${browserInfo?.osName}, Browser: ${browserInfo?.browserName}, Address: ${ipInfo?.ip}`,
          receiverEmail: "iamshiv20032003@gmail.com",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipInfo]);

  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      <p>{user?.email}</p>
      <p>Your IP Address: {ipInfo?.ip}</p>
      <p>
        Your Location: {ipInfo?.city}, {ipInfo?.region}, {ipInfo?.country_name}
      </p>
      <p>Browser: {browserInfo?.browserName}</p>
      <p>Operating System: {browserInfo?.osName}</p>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;

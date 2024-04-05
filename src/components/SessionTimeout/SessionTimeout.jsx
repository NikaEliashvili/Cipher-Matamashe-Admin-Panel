import "./sessionTimeout.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authToken,
  clearJWT,
  setNewJWT,
} from "../../redux/authSlice";
import Button from "../Button/Button";
import getUserByToken from "../../services/authServices/getUserByToken";
import logInService from "../../services/authServices/logInService";
import refreshToken from "../../services/authServices/refreshToken";
import { jwtDecode } from "jwt-decode";

const SessionTimeout = () => {
  const dispatch = useDispatch();
  const token = useSelector(authToken);
  const [showMessage, setShowMessage] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const expirationDate = jwtDecode(token).exp;

  useEffect(() => {
    const checkExpiration = () => {
      // Create a new Date object with the given date and time for testing purposes
      // const date = new Date("Thu Apr 04 2024 22:12:20 GMT+0400");
      // Get the Unix timestamp (seconds since the Unix epoch) for testing purposes
      // const expTimeTimestamp = Math.floor(date.getTime() / 1000);

      // Calculate remaining time until expiration
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const remainingTime = expirationDate - currentTime;

      if (remainingTime < 0) {
        // If expiration time has already passed, log out
        handleLogout();
      } else if (remainingTime <= 5 * 60 && remainingTime >= 0) {
        // If remaining time is less than or equal to 5 minutes, show session timeout message
        if (showMessage === false) {
          setShowMessage(true);
        }
        setTimeLeft(remainingTime);
      } else {
        // If remaining time is greater than 5 minutes, no need to show message
        if (showMessage) {
          setShowMessage(false);
        }
      }
    };

    // Call checkExpiration immediately
    checkExpiration();

    // Schedule checkExpiration to run every second
    const interval = setInterval(() => {
      checkExpiration();
    }, 1000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [expirationDate]);

  const handleContinueSession = () => {
    setIsClosed(true);

    /**Add time out for Animation */
    setTimeout(() => {
      setIsClosed(false);
      // getUserByToken(token, dispatch).then((userData) => {
      //   logInService(userData.username, userData.password, dispatch);
      // });
      refreshToken(token, dispatch);
      setShowMessage(false);
    }, 800);
  };

  // Function to handle log out
  const handleLogout = () => {
    setIsClosed(true);
    /**Add time out for Animation */
    setTimeout(() => {
      setIsClosed(false);
      dispatch(clearJWT());
    }, 800);
  };

  // Convert timeLeft to minutes and seconds

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Format the time as 'mm:ss'
    const formattedTime = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    return formattedTime;
  };

  return (
    showMessage && (
      <div
        className={
          "session-timeout-background " + (!isClosed ? "" : "close")
        }
      >
        <div
          className={"session-timeout " + (!isClosed ? "" : "close")}
        >
          <div className="session-header">
            <h6>სესია იწურება :/</h6>
          </div>
          <div className="devision-line"></div>
          <div className="session-info-text">
            <p>
              თქვენ სესიას ეწურება დრო, თუ გსურთ სესიის გაგრძელება
              დააჭირეთ ღილაკს გაგრძელება. სხვა შემთხვევაში სესია
              დასრულდება&nbsp;
              <span className="time">{formattedTime(timeLeft)}</span>
              &nbsp; წუთში
            </p>
          </div>
          <div className="devision-line"></div>
          <div className="buttons">
            <Button onClick={handleLogout} classNames={"log-out-btn"}>
              გამოსვლა
            </Button>
            <Button
              onClick={handleContinueSession}
              classNames={"stay-in-btn"}
            >
              გაგრძელება ({formattedTime(timeLeft)})
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default SessionTimeout;

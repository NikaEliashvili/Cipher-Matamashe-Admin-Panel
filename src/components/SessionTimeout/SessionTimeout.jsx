import "./sessionTimeout.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authToken,
  clearJWT,
  setNewJWT,
} from "../../redux/authSlice";
import Button from "../Button/Button";
import expirationTime from "../../constants/expirationTime";
import getUserByToken from "../../services/getUserByToken";
import logInService from "../../services/logInService";

const SessionTimeout = () => {
  const dispatch = useDispatch();
  const token = useSelector(authToken);
  const [showMessage, setShowMessage] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showMessage]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleLogout();
    }
  }, [timeLeft, setTimeLeft, dispatch]);

  const handleContinueSession = () => {
    setIsClosed(true);

    /**Add time out for Animation */
    setTimeout(() => {
      setIsClosed(false);
      getUserByToken(token, dispatch).then((userData) => {
        logInService(userData.username, userData.password, dispatch);
      });
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

  useEffect(() => {
    // Show the session timeout message 5 minutes before the expiration time
    const timeout = setTimeout(() => {
      setShowMessage(true);
      console.log("run");
    }, expirationTime - 5 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, []);

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

import React from "react";

import "./adminUser.css";
import { ThreeDots } from "react-loader-spinner";
import useGetUserByToken from "../../hooks/useGetUserByToken ";
export default function AdminUser() {
  // const [adminUser, isLoading, error] = useGetUserByToken();
  const [adminUser, isLoading, error] = [null, false, null];

  return (
    <div className="user-container">
      <div className="user-info">
        <h4 className="user-name">
          {isLoading ? (
            <ThreeDots
              visible={true}
              height="10"
              width="10"
              color="#000"
              radius="3"
              wrapperClass="spinner"
            />
          ) : (
            adminUser?.username
          )}
        </h4>
        <span className="user-email">{adminUser?.email || null}</span>
      </div>
      <div className="user-img-div">
        <img
          className="user-img"
          src="/images/user/user_bg.svg"
          alt=""
        />
        <div className="user-name-first-letter">
          {adminUser?.username?.[0]?.toUpperCase() || null}
        </div>
      </div>
    </div>
  );
}

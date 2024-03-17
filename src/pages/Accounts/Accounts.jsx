import "./accounts.css";
import React, { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Table from "../../components/Table/Table";
import { allAccountColumnNames } from "../../constants/accountsTableData";

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns = allAccountColumnNames;
  const dataSource = [
    {
      name: "User1",
      email: "username@gmail.com",
      registrationDate: "01.02.2023",
      averageOrderValue: "45,90",
      purchaseFrequency: (
        <div className="purchaseFrequency">
          <span className="purchaseFrequency-value">7,9</span>
          <img
            className="purchaseFrequency-icon"
            src="/icons/base.svg"
            alt=""
          />
        </div>
      ),
      otherInformation: (
        <span className="otherInformation">ნახვა</span>
      ),
      feedback: <span className="feedback">2</span>,
      edit: (
        <span className="action-btn">
          <img
            style={{ width: "20px", height: "20px" }}
            src="/icons/edit-baggy.svg"
            alt=""
          />
        </span>
      ),
      otherAction: (
        <div className="other-actions">
          <span className="action-btn">
            <img src="/icons/forbidden.svg" alt="" />
          </span>
          <span className="action-btn">
            <img src="/icons/increasing.svg" alt="" />
          </span>
          <span className="action-btn">
            <img src="/icons/delete-regular.svg" alt="" />
          </span>
        </div>
      ),
      download: (
        <span className="action-btn">
          <img
            style={{ width: "18px", height: "18px" }}
            src="/icons/file-export.svg"
            alt=""
          />
        </span>
      ),
    },
  ];

  return (
    <div className="accounts-page">
      <div className="header">
        <PageHeader
          title={"ანგარიშები"}
          subtitle={"ანგარიშების მონაცემთა ბაზა"}
          icon={"/icons/products-page-logo.svg"}
        />
      </div>
      <div className="search-bar">
        <img
          width={12}
          src="/icons/search-icon.svg"
          alt="search"
          className="search-icon"
        />
        <input
          type="text"
          className="search-input"
          placeholder="ძიება"
          value={searchTerm}
          inputMode="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src="/icons/search-filter.svg" alt="" />
      </div>
      {columns && (
        <div className="products-table">
          <Table columns={columns} dataSource={dataSource} />
        </div>
      )}
    </div>
  );
};

export default Accounts;

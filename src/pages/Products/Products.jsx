import "./products.css";

import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Table from "../../components/Table/Table";

import EditIcon from "/icons/edit.svg";
import TrashGrayIcon from "/icons/trash-gray.svg";

export default function Products() {
  const columns = [
    { key: "image", title: "სურათი", dataIndex: "image" },
    { key: "name", title: "სახელი", dataIndex: "name" },
    { key: "category", title: "კატეგორია", dataIndex: "category" },
    {
      key: "availablity",
      title: "ხელმისაწვდომობა",
      dataIndex: "availablity",
    },
    { key: "priceV1", title: "ფასი (v1)", dataIndex: "priceV1" },
    {
      key: "profitV1",
      title: "ფასნადები (v1)",
      dataIndex: "profitV1",
    },
    { key: "priceV2", title: "ფასი (v2)", dataIndex: "priceV2" },
    {
      key: "profitV2",
      title: "ფასნადები (v2)",
      dataIndex: "profitV2",
    },
    {
      key: "discount",
      title: "ფასდაკლება",
      dataIndex: "discount",
    },
    { key: "subtitles", title: "სუბტიტრები", dataIndex: "subtitles" },
    { key: "description", title: "აღწერა", dataIndex: "description" },
    {
      key: "voiceover",
      title: "გახმოვანება",
      dataIndex: "voiceover",
    },
    { key: "views", title: "ნახვები", dataIndex: "views" },
    { key: "tags", title: "თეგები", dataIndex: "tags" },
    { key: "date", title: "თარიღი", dataIndex: "date" },
    { key: "quantity", title: "რაოდენობა", dataIndex: "quantity" },
    { key: "sales", title: "გაყიდვები", dataIndex: "sales" },
    { key: "ID", title: "ID", dataIndex: "ID" },
    { key: "tools", title: "ხელსაწყოები", dataIndex: "tools" },
  ];

  const dataSource = [
    {
      image: (
        <div className="game-image">
          <img src="/images/spiderman-test.jpg" alt="" />
        </div>
      ),
      name: "Example Game",
      category: <span className="PS5">PS5</span>,
      availablity: <span className="availablity">წინასწარი</span>,
      priceV1: <span className="price">49.99₾</span>,
      profitV1: <span className="profit">10.00₾</span>,
      priceV2: <span className="price">39.99₾</span>,
      profitV2: <span className="profit">10.00₾</span>,
      discount: <span className="discount">-9.00₾</span>,
      subtitles: (
        <span className="small-text width-140">English, Spanish</span>
      ),
      description: (
        <div className="small-text width-140">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quasi quo natus eaque voluptatum ipsam! Nostrum, temporibus?
          Voluptas Lorem ipsum dolor sit amet consect
        </div>
      ),
      voiceover: (
        <span className="small-text width-140">
          English, Spanish, China, German
        </span>
      ),
      views: <span className="medium-text">1000</span>,
      tags: (
        <div className="tags">
          {["Action", "Adventure"].map((tag, index) => (
            <span key={tag + index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      ),
      date: (
        <span className="medium-text width-100">2/27/2024 12:00</span>
      ),
      quantity: <span className="medium-text">50</span>,
      sales: <span className="medium-text width-100">1500</span>,

      ID: <span className="big-text width-100">#12345</span>,
      tools: (
        <div className="table-tools">
          <button className="table-btn-edit">
            <img src={EditIcon} alt="edit" className="edit-icon" />
            რედაქტირება
          </button>
          <button className="table-btn-delete">
            <img
              src={TrashGrayIcon}
              alt="delete"
              className="trash-icon"
            />
            წაშლა
          </button>
        </div>
      ),
    },
    {
      image: (
        <div className="game-image">
          <img src="/images/spiderman-test.jpg" alt="" />
        </div>
      ),
      name: "Example Game",
      category: <span className="PS4">PS4</span>,
      availablity: <span className="availablity">ახლავე</span>,
      priceV1: <span className="price">49.99₾</span>,
      profitV1: <span className="profit">10.00₾</span>,
      priceV2: <span className="price">39.99₾</span>,
      profitV2: <span className="profit">10.00₾</span>,
      discount: <span className="discount">-9.00₾</span>,
      subtitles: (
        <span className="small-text width-140">
          English, Spanish, China, German
        </span>
      ),
      description: (
        <div className="small-text width-140">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quasi quo natus eaque voluptatum ipsam! Nostrum, temporibus?
          Voluptas Lorem ipsum dolor sit amet consect
        </div>
      ),
      voiceover: (
        <span className="small-text width-140">
          English, Spanish, China, German
        </span>
      ),
      views: <span className="medium-text">1000</span>,
      tags: (
        <div className="tags">
          {["Action", "Adventure"].map((tag, index) => (
            <span key={tag + index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      ),
      date: (
        <span className="medium-text width-100">2/27/2024 12:00</span>
      ),
      quantity: <span className="medium-text">50</span>,
      sales: <span className="medium-text width-100">1500</span>,

      ID: <span className="big-text width-100">#12345</span>,
      tools: (
        <div className="table-tools">
          <button className="table-btn-edit">
            <img src={EditIcon} alt="edit" className="edit-icon" />
            რედაქტირება
          </button>
          <button className="table-btn-delete">
            <img
              src={TrashGrayIcon}
              alt="delete"
              className="trash-icon"
            />
            წაშლა
          </button>
        </div>
      ),
    },
    {
      image: (
        <div className="game-image">
          <img src="/images/spiderman-test.jpg" alt="" />
        </div>
      ),
      name: "Example Game",
      category: <span className="PS5">PS5</span>,
      availablity: <span className="availablity">წინასწარი</span>,
      priceV1: <span className="price">49.99₾</span>,
      profitV1: <span className="profit">10.00₾</span>,
      priceV2: <span className="price">39.99₾</span>,
      profitV2: <span className="profit">10.00₾</span>,
      discount: <span className="discount">არ აქვს</span>,
      subtitles: (
        <span className="small-text width-140">English, Spanish</span>
      ),
      description: (
        <div className="small-text width-140">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quasi quo natus eaque voluptatum ipsam! Nostrum, temporibus?
          Voluptas Lorem ipsum dolor sit amet consect
        </div>
      ),
      voiceover: (
        <span className="small-text width-140">
          English, Spanish, China, German
        </span>
      ),
      views: <span className="medium-text">1000</span>,
      tags: (
        <div className="tags">
          {[
            "Action",
            "Adventure",
            "Adventure",
            "Adventure",
            "Advyntggre",
          ].map((tag, index) => (
            <span key={tag + index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      ),
      date: (
        <span className="medium-text width-100">2/27/2024 12:00</span>
      ),
      quantity: <span className="medium-text">50</span>,
      sales: <span className="medium-text width-100">1500</span>,
      ID: <span className="big-text width-100">#12345</span>,
      tools: (
        <div className="table-tools">
          <button className="table-btn-edit">
            <img src={EditIcon} alt="edit" className="edit-icon" />
            რედაქტირება
          </button>
          <button className="table-btn-delete">
            <img
              src={TrashGrayIcon}
              alt="delete"
              className="trash-icon"
            />
            წაშლა
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="products-page">
      <div className="header">
        <PageHeader
          title={"პროდუქცია"}
          subtitle={"ყველა პროდუქტი მონაცემთა ბაზიდან"}
          icon={"/icons/products-page-logo.svg"}
        />
      </div>
      <div className="products-table">
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
}

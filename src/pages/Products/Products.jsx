import "./products.css";

import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Table from "../../components/Table/Table";

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
    { key: "ID", title: "ID", dataIndex: "ID" },
    { key: "tools", title: "ხელსაწყოები", dataIndex: "tools" },
  ];

  const dataSource = [
    {
      image: <img src="image-url.jpg" alt="Game Image" />,
      name: "Example Game",
      category: "Action",
      availablity: "Available",
      priceV1: "$49.99",
      profitV1: "$10.00",
      priceV2: "$39.99",
      profitV2: "$9.00",
      discount: "$10.00",
      subtitles: "English, Spanish",
      description: "Lorem ipsum dolor sit amet",
      voiceover: "English, French, German",
      views: 1000,
      tags: ["Action", "Adventure"],
      date: "2022-01-01",
      quantity: 50,
      ID: 12345,
      tools: (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      ),
    },
    // Add more data rows as needed
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

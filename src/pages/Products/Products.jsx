import "./products.css";

import React, { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Table from "../../components/Table/Table";

import {
  ProductsDataExample,
  generateDataSource,
} from "../../constants/productsTableData";

export default function Products() {
  const productsData = ProductsDataExample;
  const [sortedBy, setSortedBy] = useState(null);
  const [dataSource, setDataSource] = useState(
    generateDataSource(productsData)
  );
  const sortTableDataByKey = (key) => {
    if (sortedBy === key) {
      productsData.sort((a, b) => (a[key] < b[key] ? 1 : -1));
      console.log("Clicked on " + key);
      setSortedBy(null);
    } else {
      productsData.sort((a, b) => (a[key] < b[key] ? -1 : 1));
      console.log("Clicked on " + key);
      setSortedBy(key);
    }
    setDataSource(generateDataSource(productsData));
  };
  const columns = [
    { key: "image", title: "სურათი", dataIndex: "image" },
    {
      key: "name",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">სახელი</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "name",
    },
    {
      key: "category",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">კატეგორია</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "category",
    },
    {
      key: "availability",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">ხელმისაწვდომობა</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "availability",
    },
    {
      key: "priceV1",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">ფასი (v1)</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "priceV1",
    },
    {
      key: "profitV1",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">ფასნადები (v1)</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "profitV1",
    },
    {
      key: "priceV2",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">ფასი (v2)</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "priceV2",
    },
    {
      key: "profitV2",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">ფასნადები (v2)</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "profitV2",
    },
    {
      key: "discount",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">ფასდაკლება</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "discount",
    },
    { key: "subtitles", title: "სუბტიტრები", dataIndex: "subtitles" },
    { key: "description", title: "აღწერა", dataIndex: "description" },
    {
      key: "voiceover",
      title: "გახმოვანება",
      dataIndex: "voiceover",
    },
    {
      key: "views",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">ნახვები</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "views",
    },
    { key: "tags", title: "თეგები", dataIndex: "tags" },
    {
      key: "date",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">თარიღი</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "date",
    },
    {
      key: "quantity",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">რაოდენობა</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "quantity",
    },
    {
      key: "sales",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">გაყიდვები</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "sales",
    },
    {
      key: "ID",
      get title() {
        return (
          <div
            className="col-title"
            onClick={() => sortTableDataByKey(this.key)}
          >
            <span className="col-title-name">ID</span>
            <img
              className="col-title-icon"
              src="/icons/sort-arrows.svg"
              alt="sort"
            />
          </div>
        );
      },
      dataIndex: "ID",
    },
    { key: "tools", title: "ხელსაწყოები", dataIndex: "tools" },
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
      <div className="SearchFilterWrapper"></div>
      <div className="products-table">
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
}

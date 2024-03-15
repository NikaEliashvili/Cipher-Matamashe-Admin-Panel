import "./products.css";

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Table from "../../components/Table/Table";

import {
  ProductsDataExample,
  allColumnNames,
  generateColumns,
  generateDataSource,
} from "../../constants/productsTableData";
import FormInput from "../../components/uploadProductsComponents/FormInput/FormInput";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsData, setProductsData] = useState(
    ProductsDataExample
  );
  const [sortedBy, setSortedBy] = useState(null);
  const [menuItems, setMenuItems] = useState(allColumnNames);

  const [dataSource, setDataSource] = useState(
    generateDataSource(productsData)
  );
  const sortTableDataByKey = (key) => {
    if (sortedBy === key) {
      setProductsData((prev) =>
        prev.sort((a, b) => (a[key] < b[key] ? 1 : -1))
      );
      setSortedBy(null);
    } else {
      setProductsData((prev) =>
        prev.sort((a, b) => (a[key] < b[key] ? -1 : 1))
      );
      setSortedBy(key);
    }
    setDataSource(generateDataSource(productsData));
  };

  const chooseFilters = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    );
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      const filteredData = ProductsDataExample.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProductsData(filteredData);
      setDataSource(generateDataSource(filteredData));
    }, 300);
    return () => clearTimeout(getData);
  }, [searchTerm]);

  const columns = generateColumns(menuItems, sortTableDataByKey);
  return (
    <div className="products-page">
      <div className="header">
        <PageHeader
          title={"პროდუქცია"}
          subtitle={"ყველა პროდუქტი მონაცემთა ბაზიდან"}
          icon={"/icons/products-page-logo.svg"}
        />
      </div>
      <div className="SearchFilterWrapper">
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
            placeholder="მოძებნეთ პროდუქტის სახელი, აღწერა..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="column-selector">
          <MenuButton
            chooseFilters={chooseFilters}
            menuItems={menuItems.slice(1, -1)}
          />
        </div>
      </div>
      {columns && (
        <div className="products-table">
          <Table columns={columns} dataSource={dataSource} />
        </div>
      )}
    </div>
  );
}

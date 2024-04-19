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
import getProducts from "../../services/productServices/getProducts";
import moment from "moment";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsData, setProductsData] = useState(null);
  const [sortedBy, setSortedBy] = useState(null);
  const [menuItems, setMenuItems] = useState(allColumnNames);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const sortTableDataByKey = (key) => {
    let sortProducts = productsData;
    if (sortedBy === key) {
      sortProducts.sort((a, b) =>
        Number(a[key])
          ? Number(a[key]) < Number(b[key])
            ? 1
            : -1
          : a[key] < b[key]
          ? 1
          : -1
      );
      // setProductsData((prev) =>
      //   prev.sort((a, b) =>
      //     Number(a[key])
      //       ? Number(a[key]) < Number(b[key])
      //         ? 1
      //         : -1
      //       : a[key] < b[key]
      //       ? 1
      //       : -1
      //   )
      // );
      setSortedBy(null);
    } else {
      sortProducts.sort((a, b) =>
        Number(a[key])
          ? Number(a[key]) < Number(b[key])
            ? -1
            : 1
          : a[key] < b[key]
          ? -1
          : 1
      );
      // setProductsData((prev) =>
      //   prev.sort((a, b) =>
      //     Number(a[key])
      //       ? Number(a[key]) < Number(b[key])
      //         ? -1
      //         : 1
      //       : a[key] < b[key]
      //       ? -1
      //       : 1
      //   )
      // );
      setSortedBy(key);
    }
    // setDataSource(generateDataSource(productsData));
    setDataSource(generateDataSource(sortProducts));
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
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProducts();
      const products = data
        .map((p) => ({
          image: p.images ? Object.values(p.images)[0] : "",
          name: p.name,
          category: p.categories ? Object.values(p.categories) : [],
          genres: p.genres ? Object.values(p.genres) : [],
          availability: p.available,
          // Prices
          priceV1: p.versions
            ? Object.values(p.versions).filter(
                (v) =>
                  v.version === "secondaryPricePS4" ||
                  v.version === "secondaryPrice_PlayStation 4"
              )?.[0]?.price || 0
            : 0,
          profitV1: p.versions
            ? Object.values(p.versions).filter(
                (v) =>
                  v.version === "primaryPricePS4" ||
                  v.version === "primaryPrice_PlayStation 4"
              )?.[0]?.price || 0
            : 0,
          priceV2: p.versions
            ? Object.values(p.versions).filter(
                (v) =>
                  v.version === "secondaryPricePS5" ||
                  v.version === "secondaryPrice_PlayStation 5"
              )?.[0]?.price || 0
            : 0,
          profitV2: p.versions
            ? Object.values(p.versions).filter(
                (v) =>
                  v.version === "primaryPricePS5" ||
                  v.version === "primaryPrice_PlayStation 5"
              )?.[0]?.price || 0
            : 0,
          discount: p.discount,
          subtitles: p.subtitles ? Object.values(p.subtitles) : [],
          description: p.description,
          voiceover: p.languages ? Object.values(p.languages) : [],
          views: p.views,
          tags: p.tags ? Object.values(p.tags) : [],
          date: moment(p.created_at),
          quantity: p.quantity,
          sales: p.sold,
          ID: "#" + p.product_id,
        }))
        ?.sort((a, b) =>
          moment(a.created_at) > moment(b.created_at) ? 1 : -1
        );
      if (products) {
        setProductsData(products);
        setDataSource(generateDataSource(products));
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getData = setTimeout(() => {
      setIsLoading(true);
      if (productsData) {
        const filteredData =
          productsData?.filter((product) =>
            product.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) || [];
        setDataSource(generateDataSource(filteredData));
        setIsLoading(false);
      }
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
          <Table
            columns={columns}
            dataSource={dataSource}
            maxHeight={600}
            loading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

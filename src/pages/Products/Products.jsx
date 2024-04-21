import "./products.css";

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Table from "../../components/Table/Table";

import {
  allColumnNames,
  generateColumns,
  generateDataSource,
} from "../../constants/productsTableData";
import MenuButton from "../../components/MenuButton/MenuButton";
import getProducts from "../../services/productServices/getProducts";
import moment from "moment";
import deleteProduct from "../../services/productServices/deleteProduct";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../redux/authSlice";
import { ThreeDots } from "react-loader-spinner";
import DeleteProductModal from "../../modals/deleteProductModal/DeleteProductModal";
import { closeModal, openModal } from "../../redux/modalSlice";
import Button from "../../components/Button/Button";

export default function Products() {
  const token = useSelector(authToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsData, setProductsData] = useState(null);
  const [sortedBy, setSortedBy] = useState(null);
  const [menuItems, setMenuItems] = useState(allColumnNames);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [updateProducts, setUpdateProducts] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const dispatch = useDispatch();
  const handleOpenModal = (productID) => {
    setSelectedProductId(productID);
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

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

      setSortedBy(key);
    }
    setDataSource(
      generateDataSource(
        sortProducts,
        // hanldeDelete,
        handleOpenModal,
        handleUpdateProduct
      )
    );
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

  const handleUpdateProduct = () => {
    console.log("Function is not ready yet...");
  };

  const hanldeDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteProduct(selectedProductId, token);
      if (response.data) {
        console.log(response.data);
        setSelectedProductId(null);
        dispatch(closeModal());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsDeleting(false);
      }, 700);
    }
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
            ? "+" +
              (Object.values(p.versions).filter(
                (v) =>
                  v.version === "primaryPricePS4" ||
                  v.version === "primaryPrice_PlayStation 4"
              )?.[0]?.price || 0) +
              "₾"
            : 0,
          priceV2: p.versions
            ? Object.values(p.versions).filter(
                (v) =>
                  v.version === "secondaryPricePS5" ||
                  v.version === "secondaryPrice_PlayStation 5"
              )?.[0]?.price || 0
            : 0,
          profitV2: p.versions
            ? "+" +
              (Object.values(p.versions).filter(
                (v) =>
                  v.version === "primaryPricePS5" ||
                  v.version === "primaryPrice_PlayStation 5"
              )?.[0]?.price || 0) +
              "₾"
            : 0,
          discount: "-" + (p.discount || 0) + "₾",
          subtitles: p.subtitles ? Object.values(p.subtitles) : [],
          description: p.description,
          voiceover: p.languages ? Object.values(p.languages) : [],
          views: p.views,
          tags: p.tags ? Object.values(p.tags) : [],
          date: moment(p.created_at),
          quantity: p.quantity,
          sales: p.sold,
          ID: "#" + p.product_id,
          productID: p.product_id,
        }))
        ?.sort((a, b) =>
          moment(a.created_at) > moment(b.created_at) ? 1 : -1
        );
      if (products) {
        setProductsData(products);
        setDataSource(
          generateDataSource(
            products,
            // hanldeDelete,
            handleOpenModal,
            handleUpdateProduct
          )
        );
      }
      setIsLoading(false);
    };
    fetchData();
  }, [updateProducts]);

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
        setDataSource(
          generateDataSource(
            filteredData,
            // hanldeDelete,
            handleOpenModal,
            handleUpdateProduct
          )
        );
      }
      setIsLoading(false);
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
            loading={isLoading}
            updateLoading={isDeleting}
          />
          <DeleteProductModal>
            <h4 className="modal-header">
              გსურთ #{selectedProductId} პროდუქტის წაშლა?
            </h4>
            <div className="modal-buttons-container">
              <Button
                onClick={handleCloseModal}
                classNames={"modal-close-btn"}
              >
                დახურვა
              </Button>
              <Button
                onClick={hanldeDelete}
                classNames={"modal-delete-btn"}
              >
                წაშლა
              </Button>
            </div>
          </DeleteProductModal>
          {isDeleting && (
            <div className="update-loading">
              <ThreeDots
                visible={true}
                height="30"
                width="20"
                color="#5d5d6487"
                radius="9"
                wrapperClass="spinner"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

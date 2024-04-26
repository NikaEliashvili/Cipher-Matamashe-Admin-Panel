import "./products.css";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const [page, setPage] = useState(1);
  const [productsTotalAmount, setProductsTotalAmount] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cachedPages, setCachedPages] = useState(null);
  const dispatch = useDispatch();

  const PAGE_LIMIT = 3;

  const handleOpenModal = (productID) => {
    setSelectedProductId(productID);
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const sortTableDataByKey = (key) => {
    let sortProducts = productsData;
    if (sortProducts) {
      if (sortedBy === key) {
        sortProducts.sort((a, b) => {
          let valueA = a[key];
          let valueB = b[key];
          if (key === "priceV1" || key === "priceV2") {
            valueA = valueA.slice(0, -1);
            valueB = valueB.slice(0, -1);
          }
          if (
            key === "profitV1" ||
            key === "profitV2" ||
            key === "discount"
          ) {
            valueA = valueA.slice(1, -1);
            valueB = valueB.slice(1, -1);
          }
          return Number(valueA)
            ? Number(valueA) < Number(valueB)
              ? 1
              : -1
            : valueA < valueB
            ? 1
            : -1;
        });
        setSortedBy(null);
      } else {
        sortProducts.sort((a, b) => {
          let valueA = a[key];
          let valueB = b[key];
          if (key === "priceV1" || key === "priceV2") {
            valueA = valueA.slice(0, -1);
            valueB = valueB.slice(0, -1);
          }
          if (
            key === "profitV1" ||
            key === "profitV2" ||
            key === "discount"
          ) {
            valueA = valueA.slice(1, -1);
            valueB = valueB.slice(1, -1);
          }
          return Number(valueA)
            ? Number(valueA) < Number(valueB)
              ? -1
              : 1
            : valueA < valueB
            ? -1
            : 1;
        });

        setSortedBy(key);
      }
    }
    setDataSource(
      generateDataSource(
        sortProducts,
        handleOpenModal,
        handleUpdateProduct
      )
    );
  };

  const chooseFilters = (id) => {
    setMenuItems((prev) =>
      prev?.map((item) =>
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
      setIsUpdating(true);
      const response = await deleteProduct(selectedProductId, token);
      if (response.data) {
        console.log(response.data);
        setSelectedProductId(null);
        setCachedPages((prev) => ({
          ...prev,
          [page]: null,
        }));
        dispatch(closeModal());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsUpdating(false);
      }, 700);
    }
  };

  const handlePagination = async (page) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (productsData) {
        setIsUpdating(true);
      } else {
        setIsLoading(true);
      }

      const cachedData = cachedPages?.[page];
      if (cachedData) {
        setProductsData(cachedData);
        setDataSource(
          generateDataSource(
            cachedData,
            handleOpenModal,
            handleUpdateProduct
          )
        );
        setIsLoading(false);
        setIsUpdating(false);
        return;
      }
      const data = await getProducts(page, PAGE_LIMIT);
      if (data && data.total && data.total !== productsTotalAmount) {
        setProductsTotalAmount(data?.total);
      }
      const products = data?.products
        ?.map((p) => ({
          image: p.images ? Object.values(p.images)[0] : "",
          name: p.name,
          category: p.categories ? Object.values(p.categories) : [],
          genres: p.genres ? Object.values(p.genres) : [],
          availability: p.available,
          // Prices
          priceV1: p.versions
            ? (Object.values(p.versions).filter(
                (v) =>
                  v.version === "secondaryPricePS4" ||
                  v.version === "secondaryPrice_PlayStation 4"
              )?.[0]?.price || 0) + "₾"
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
            ? (Object.values(p.versions).filter(
                (v) =>
                  v.version === "secondaryPricePS5" ||
                  v.version === "secondaryPrice_PlayStation 5"
              )?.[0]?.price || 0) + "₾"
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
        // Cache the fetched data
        setCachedPages((prevCachedPages) => ({
          ...prevCachedPages,
          [page]: products,
        }));

        setProductsData(products);
        setDataSource(
          generateDataSource(
            products,
            handleOpenModal,
            handleUpdateProduct
          )
        );
      }
      setTimeout(() => {
        setIsLoading(false);
        setIsUpdating(false);
      }, 1000);
    };
    fetchData();
  }, [page, cachedPages]);

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
            handleOpenModal,
            handleUpdateProduct
          )
        );
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(getData);
  }, [searchTerm]);

  // Generate columns
  const columns = useMemo(
    () => generateColumns(menuItems, sortTableDataByKey),
    [dataSource]
  );
  // Calculate amount of max pages
  const maxPages = useMemo(() => {
    return Math.ceil(productsTotalAmount / PAGE_LIMIT);
  }, [productsTotalAmount]);
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
            columns={Array(columns) ? columns : []}
            dataSource={dataSource}
            loading={isLoading}
            updateLoading={isUpdating}
            maxPage={maxPages}
            handlePagination={handlePagination}
          />
          <DeleteProductModal
            title={`გსურთ #${selectedProductId} პროდუქტის წაშლა?`}
          >
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
          {/* {isUpdating && (
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
          )} */}
        </div>
      )}
    </div>
  );
}

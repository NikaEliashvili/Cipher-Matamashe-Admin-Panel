import React, { useState } from "react";
import "./table.css";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { IoIosArrowBack } from "react-icons/io";

const Table = ({
  columns,
  dataSource,
  maxHeight = "calc(100vh - 450px)",
  maxWidth = "auto",
  loading,
  pagination = true,
  updateLoading,
  currentPage = 2,
  maxPage = 30,
  handlePagination = () => {
    console.log(currentPage + 1);
  },
}) => {
  const [focusedRow, setFocusedRow] = useState(null);
  const [activePage, setActivePage] = useState(currentPage);
  const allPages = new Array(maxPage)
    .fill(0)
    .map((_, index) => index + 1);
  const handleClickOnRow = (rowIndex) => {
    setFocusedRow((prev) => (prev === rowIndex ? null : rowIndex));
  };

  const nextPage = () => {
    setActivePage((prev) => (prev < maxPage ? prev + 1 : prev));
  };

  const prevPage = () => {
    setActivePage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const choosePage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setActivePage(page);
    }
  };

  const pagesSlice = allPages.slice(
    activePage > maxPage - 3
      ? maxPage - 5
      : activePage >= 3
      ? activePage - 3
      : 0,
    activePage <= 3 ? activePage + (5 - activePage) : activePage + 2
  );

  return (
    <div className="table-container-pagination">
      <div
        className={
          "table-container " + (updateLoading ? "block_overflow" : "")
        }
        style={{
          maxHeight: maxHeight,
          maxWidth: maxWidth,
        }}
      >
        <table className={"table"}>
          <thead>
            <tr>
              {columns?.map((column) => (
                <th key={column.key} className="table-header">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource &&
              dataSource.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => handleClickOnRow(rowIndex)}
                  className={
                    "table-row " +
                    (focusedRow === rowIndex && "focused")
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={`${rowIndex}-${column.key}`}
                      className="table-cell"
                    >
                      <div className="table-cell-content">
                        {row[column.dataIndex] || null}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {dataSource?.length === 0 && !loading && (
          <div className="no-data">პროდუქტი ვერ მოიძებნა...</div>
        )}
        {loading && dataSource?.length === 0 && (
          <div className="loading">
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
      {pagination && (
        <div className="pagination-buttons">
          <button
            disabled={activePage === 1}
            onClick={prevPage}
            className="pagination-btn"
          >
            <IoIosArrowBack size={22} />
          </button>

          {activePage > 3 && (
            <div
              onClick={() => choosePage(1)}
              className={"page-number static"}
            >
              1
            </div>
          )}

          {pagesSlice?.map((page) => (
            <div
              key={page}
              onClick={() => choosePage(page)}
              className={`page-number ${
                page === activePage ? "current-page" : ""
              }`}
            >
              {page}
            </div>
          ))}

          {activePage < maxPage - 3 && (
            <div
              onClick={() => choosePage(maxPage)}
              className={"page-number static"}
            >
              {maxPage}
            </div>
          )}

          <button
            disabled={activePage === maxPage}
            onClick={nextPage}
            className="pagination-btn"
          >
            <IoIosArrowBack
              size={22}
              style={{ transform: "rotate(180deg)" }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Table);

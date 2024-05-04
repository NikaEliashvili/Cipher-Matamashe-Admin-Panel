import React, { useState } from "react";
import "./table.css";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { IoIosArrowBack } from "react-icons/io";

const Table = ({
  columns,
  dataSource,
  maxHeight = "calc(100vh - 450px)",
  maxWidth = "auto",
  minHeight = "400px",
  loading,
  pagination = true,
  updateLoading,
  currentPage = 1,
  maxPage = 1,
  handlePagination = () => {},
}) => {
  const [focusedRow, setFocusedRow] = useState(null);
  const [activePage, setActivePage] = useState(currentPage);
  const allPages = new Array(maxPage)
    .fill(0)
    .map((_, index) => index + 1);
  const handleClickOnRow = (rowIndex) => {
    setFocusedRow((prev) => (prev === rowIndex ? null : rowIndex));
  };

  const choosePage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setActivePage(page);
      handlePagination(page);
    }
  };

  // console.log(maxPage);
  const pagesSlice =
    maxPage > 10
      ? allPages.slice(
          activePage > maxPage - 3
            ? maxPage - 5
            : activePage >= 3
            ? activePage - 3
            : 0,
          activePage <= 3
            ? activePage + (5 - activePage)
            : activePage + 2
        )
      : allPages;
  console.log({ dataSource }, { loading });
  return (
    <div className="table-container-pagination">
      <div
        className={
          "table-container " +
          (updateLoading || loading ? "block_overflow" : "")
        }
        style={{
          maxHeight: maxHeight,
          maxWidth: maxWidth,
          minHeight: minHeight,
        }}
      >
        {updateLoading && (
          <div className="update-loading">
            <ThreeDots
              visible={true}
              height="40"
              width="20"
              color="#404041"
              radius="9"
              wrapperClass="spinner"
            />
          </div>
        )}
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
                  className={
                    "table-row " +
                    (focusedRow === row.ID && "focused")
                  }
                  onClick={() => handleClickOnRow(row.ID)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${rowIndex}-${column.key}`}
                      className="table-cell"
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="table-cell-content"
                      >
                        {row[column.dataIndex] || null}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {dataSource && dataSource?.length === 0 && !loading && (
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
            onClick={() => choosePage(activePage - 1)}
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
            onClick={() => choosePage(activePage + 1)}
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

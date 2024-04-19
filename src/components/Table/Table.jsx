import React from "react";
import "./table.css";
import { TailSpin, ThreeDots } from "react-loader-spinner";

const Table = ({
  columns,
  dataSource,
  maxHeight = "auto",
  maxWidth = "auto",
  loading,
}) => {
  return (
    <div
      className="table-container"
      style={{
        maxHeight: "600px ",
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
              <tr key={rowIndex} className="table-row">
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
      {(dataSource?.length === 0 || !dataSource) && !loading && (
        <div className="no-data">პროდუქტი ვერ მოიძებნა...</div>
      )}
      {loading && (
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
  );
};

export default React.memo(Table);

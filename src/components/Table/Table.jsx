import React from "react";
import "./table.css";

const Table = ({ columns, dataSource, scrollableX, scrollableY }) => {
  return (
    <div className="table-container">
      <table
        className={`table ${scrollableX ? "scrollable-x" : ""} ${
          scrollableY ? "scrollable-y" : ""
        }`}
      >
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
          {dataSource?.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className="table-cell"
                >
                  {row[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);

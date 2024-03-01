import React from "react";

export default function ErrorPage() {
  return (
    <div>
      <h1
        style={{
          color: "red",
          margin: "auto",
          position: "absolute",
          inset: 0,
          width: "fit-content",
          height: "fit-content",
        }}
      >
        This Page Does not Exists
      </h1>
    </div>
  );
}

import React from "react";

function Label({ htmlFor, children, className = "", ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-semibold text-gray-700 mb-3 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;

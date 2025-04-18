import React from "react";
import "./Input.css";

const Input = ({ value, onChange, placeholder, type = "text", ...props }) => {
  return (
    <input
      type={type}
      className="custom-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
    
  );
};

export default Input;

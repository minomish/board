import React from "react";
import "./Button.css"; 

const Button = ({ children, onClick, type = "button", variant = "primary", ...props }) => {
  return (
    <button
      type={type}
      className={`custom-button ${variant}`}  // Подключаем правильный класс в зависимости от variant
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

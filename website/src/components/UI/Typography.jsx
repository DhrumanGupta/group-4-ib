import React from "react";

export const Header = ({ children, ariaLabel }) => {
  return (
    <p
      tabIndex={0}
      role="heading"
      aria-level={10}
      aria-label={ariaLabel}
      className="text-2xl font-extrabold leading-6 text-gray-800"
    >
      {children}
    </p>
  );
};

import React from "react";
import propTypes from "prop-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export function PasswordInput({
  className,
  invalid,
  value,
  setValue,
  label,
  hidden,
  toggleHidden,
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium leading-none text-gray-800">
        {label}
      </label>
      <div className="relative flex items-center justify-center">
        <input
          aria-label="enter Password"
          role="input"
          type={hidden ? "password" : "text"}
          className={`bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 ring-offset-2 ${
            invalid && "ring-red-500 ring-2"
          }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div
          className="absolute right-0 mt-2 mr-3 cursor-pointer"
          onClick={toggleHidden}
        >
          {hidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      </div>
    </div>
  );
}

export function TextInput({ className, invalid, value, setValue, label }) {
  return (
    <div className={className}>
      <label className={`text-sm font-medium leading-none text-gray-800`}>
        {label}
      </label>
      <input
        role="input"
        type={"text"}
        className={`bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 ring-offset-2 ${
          invalid && "ring-red-500 ring-2"
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

const commonPropTypes = {
  className: propTypes.string,
  invalid: propTypes.bool,
  value: propTypes.string.isRequired,
  setValue: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
};

const commonDefaultProps = {
  className: "",
  invalid: false,
};

TextInput.propTypes = { ...commonPropTypes };

TextInput.defaultProps = { ...commonDefaultProps };

PasswordInput.propTypes = {
  ...commonPropTypes,
  hidden: propTypes.bool.isRequired,
  toggleHidden: propTypes.func.isRequired,
};

PasswordInput.defaultProps = {
  ...commonDefaultProps,
  hidden: true,
  label: "Password",
};

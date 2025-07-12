import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    placeholder = "",
    className = "",
    error = false,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="block text-md text-white mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={`${type}`}
        className={`px-3 py-2 border outline-none text-md  ${
          error ? "border-red-400" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-[#ff7a59]   ${className}`}
        placeholder={`${placeholder}`}
        ref={ref}
        {...props}
        id={id}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
});

export default Input;

import React, { forwardRef, useId } from "react";

function Select(
  { options = [], label, className = "", error = false, ...props },
  ref
) {
  const id = useId();
  return (
    <div className={` w-full`}>
      {label && (
        <label
          htmlFor={id}
          className="inline-block  text-sm text-white mb-1 pl-1"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 border outline-none duration-200 ${
          error ? "border-red-400" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-[#ff7a59] ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

export default forwardRef(Select);

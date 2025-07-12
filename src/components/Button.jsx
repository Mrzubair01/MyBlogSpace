import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "#ff7a59",
  textColor = "#fff",
  hoverBgColor = "#ff5c35",
  className = "",
  ...props
}) {
  return (
    <button
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-1 active:scale-95 ${className} focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50`}
      {...props}
    >
      <span
        className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]`}
      />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[${bgColor}] ${bgColor}  hover:bg-[${hoverBgColor}] duration-500 transition px-3 py-1 text-sm font-medium text-${textColor} backdrop-blur-3xl`}
      >
        {children}
      </span>
    </button>
  );
}

export default Button;

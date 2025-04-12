import React, { FC } from "react";

interface LoaderProps {
  thickness?: number;
  classNames?: string;
  size?: number;
}

const Loader: FC<LoaderProps> = ({
  thickness = 3,
  classNames = "text-green-600",
  size = 30,
}) => {
  const loaderStyle: React.CSSProperties = {
    animation: "loaderRotate 2s linear infinite",
    zIndex: 2,
  };

  const pathStyle: React.CSSProperties = {
    stroke: "currentColor",
    strokeLinecap: "round",
    animation: "loaderDash 1.5s ease-in-out infinite",
  };

  return (
    <span className={classNames}>
      <svg
        className="loader"
        style={loaderStyle}
        viewBox="0 0 50 50"
        height={size}
        width={size}
      >
        <circle
          className="path"
          style={pathStyle}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth={thickness}
        ></circle>
      </svg>
      {/* Embedding the keyframes directly in the style */}
      <style>{`
        @keyframes loaderRotate {
          0% {
            transform: rotate(0deg);
            transform-origin: center;
          }
          100% {
            transform: rotate(360deg);
            transform-origin: center;
          }
        }

        @keyframes loaderDash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `}</style>
    </span>
  );
};

export default Loader;

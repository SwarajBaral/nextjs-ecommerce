// components/Popup.tsx

import React from "react";

interface PopupProps {
  message: string;
  type: "error" | "success" | "info";
  onClose: () => void;
  buttonMsg?: string;
}

const Popup: React.FC<PopupProps> = ({ message, type, onClose, buttonMsg }) => {
  if (!buttonMsg) {
    buttonMsg = "Close";
  }
  let bgColor = "";
  let textColor = "";

  // Set background and text color based on the type
  switch (type) {
    case "error":
      bgColor = "bg-red-500";
      textColor = "text-white";
      break;
    case "success":
      bgColor = "bg-teal-400";
      textColor = "text-white";
      break;
    case "info":
      bgColor = "bg-blue-500";
      textColor = "text-white";
      break;
    default:
      bgColor = "bg-gray-500";
      textColor = "text-white";
      break;
  }

  return (
    <div className="top fixed inset-x-0 mt-4 flex items-center justify-center">
      <div className={`rounded-lg p-4 ${bgColor} ${textColor} text-center`}>
        <p>{message}</p>
        <button
          className={`mt-2 rounded px-4 py-2 ${
            type === "error"
              ? "bg-white text-red-500"
              : type === "success"
                ? "bg-white text-green-500"
                : "bg-white text-blue-500"
          }`}
          onClick={onClose}
        >
          {buttonMsg}
        </button>
      </div>
    </div>
  );
};

export default Popup;

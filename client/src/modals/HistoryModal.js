import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearHistory } from "../redux/historySlice";

const HistoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history || []);

  const handleClearHistory = () => {
    dispatch(clearHistory()); // Вызов действия для очистки истории
  };

  return (
    <div
      className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-4/5 lg:w-3/5 h-4/5 lg:h-3/5 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">History</h2>
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M6.7 5.3a1 1 0 011.4 0L12 10.59l4.3-4.3a1 1 0 111.4 1.4L13.41 12l4.3 4.3a1 1 0 01-1.42 1.4L12 13.41l-4.3 4.3a1 1 0 01-1.4-1.42L10.59 12 6.3 7.7a1 1 0 010-1.4z"
              />
            </svg>
          </button>
        </div>
        <ul>
          {history.map((action, index) => (
            <li key={index} className="text-sm text-gray-700 mb-2">
              <span className="font-bold">{action.type}</span> -{" "}
              {new Date(action.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
        <button
          onClick={handleClearHistory}
          className="bg-red-500 text-white px-3 py-2 rounded mt-4 hover:bg-red-600"
        >
          Clear History
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;

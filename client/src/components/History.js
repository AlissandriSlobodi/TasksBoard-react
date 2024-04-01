import React from "react";
import { useSelector } from "react-redux";

function History() {
  const history = useSelector((state) => state.history || []); // Предоставляем значение по умолчанию, если история не определена

  return (
    <div className="history-modal">
      <ul>
        {history.map((action, index) => (
          <li key={index}>{action.type}</li> // Отображаем тип действия из истории
        ))}
      </ul>
    </div>
  );
}

export default History;

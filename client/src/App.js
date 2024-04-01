import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardsSlice } from "./redux/boardsSlice";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";
import HistoryModal from "./modals/HistoryModal";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false); // Состояние для открытия и закрытия модального окна с историей
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards && boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  const handleHistoryClick = () => {
    setIsHistoryModalOpen(true); // Открываем модальное окно с историей при нажатии на кнопку "History"
  };

  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        {boards.length > 0 ? (
          <>
            <Header
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
              onHistoryClick={handleHistoryClick} // Передаем обработчик события для кнопки "History"
            />
            <Home
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
      {isHistoryModalOpen && (
        <HistoryModal onClose={() => setIsHistoryModalOpen(false)} />
      )}{" "}
    </div>
  );
}

export default App;

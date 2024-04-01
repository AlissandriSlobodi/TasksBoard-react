import { createSlice } from "@reduxjs/toolkit";
import { addToHistory } from "./historySlice";
import data from "../data.json";

export const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: payload.newColumns,
      };
      state.push(board);
      addToHistory({ type: "ADD_BOARD", payload: action.payload });
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.columns = payload.newColumns;
      addToHistory({ type: "EDIT", payload: action.payload });
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      const index = state.indexOf(board);
      state.splice(index, 1);
      addToHistory({ type: "DELETE_BOARD" });
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        newColIndex,
        selectedDate,
        priority, // Добавляем приоритет в параметры
      } = action.payload;
      const convertedDate = selectedDate.toISOString();
      const task = {
        title,
        description,
        subtasks,
        status,
        selectedDate: convertedDate,
        priority, // Добавляем приоритет в объект задачи
      };
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
      const currentTime = new Date().toISOString(); // Получаем текущее время в формате ISO
      addToHistory({
        type: "ADD_TASK",
        payload: {
          ...action.payload,
          taskTitle: task.title,
          timestamp: currentTime,
        },
      });
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
        selectedDate,
        priority,
      } = action.payload;

      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);

      const originalTask = { ...task }; // Сохраняем исходное состояние задачи

      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (selectedDate) {
        task.selectedDate = selectedDate.toISOString();
      }
      task.priority = priority;

      if (prevColIndex === newColIndex) return;

      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);

      // Передаем информацию о редактировании задачи в addToHistory
      addToHistory({
        type: "EDIT_TASK",
        payload: {
          originalTask,
          taskTitle: task.title,
          editedTask: { ...task }, // Измененное состояние задачи
        },
      });
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns.find((col, i) => i === colIndex).tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
deleteTask: (state, action) => {
  const payload = action.payload;
  const board = state.find((board) => board.isActive);
  const col = board.columns.find((col, i) => i === payload.colIndex);
  const task = col.tasks[payload.taskIndex];

  // Проверяем, является ли task.selectedDate допустимой датой
  const date = new Date(task.selectedDate);
  if (!isNaN(date.getTime())) {
    const convertedDate = date.toISOString();
    console.log(convertedDate);
  } else {
    console.error('Недопустимое значение даты: ', task.selectedDate);
    // Можно выполнить дополнительные действия в случае недопустимой даты
  }

  col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
  const currentTime = new Date().toISOString(); // Получаем текущее время в формате ISO
  addToHistory({
    type: "DELETE_TASK",
    payload: {
      ...action.payload,
      taskTitle: task.title,
      timestamp: currentTime,
    },
  });
},
  },
});

export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  dragTask,
  setSubtaskCompleted,
  setTaskStatus,
  deleteTask,
} = boardsSlice.actions;

export default boardsSlice;

import { BoardModel } from "*/models/board.model";
import { cloneDeep } from "lodash";

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data);
    const getNewCard = await BoardModel.findOneById(
      createdBoard.insertedId.toString()
    );
    return getNewCard;
  } catch (error) {
    throw new Error(error); // error thì trở về controller
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);

    if (!board || !board.columns) {
      throw new Error("Board not found!");
    }

    const transformBoard = cloneDeep(board);
    /**
     * Filter deleted columns
     * Array chứa column có destroy = false
     */
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );

    // Add card to each column
    /**
     * filter tìm những columnId trùng với column._id
     * rồi trả về một mảng mới cards trong column
     */
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });

    // Sort columns by columnOrder, sort cards by cardOrder, this step will pass to frontend dev

    // Remove cards data from boards
    delete transformBoard.cards;

    return transformBoard;
  } catch (error) {
    throw new Error(error); // error thì trở về controller
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };

    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;

    const updatedBoard = await BoardModel.update(id, updateData);

    return updatedBoard;
  } catch (error) {
    throw new Error(error); // error thì trở về controller
  }
};

export const BoardService = { createNew, getFullBoard, update };

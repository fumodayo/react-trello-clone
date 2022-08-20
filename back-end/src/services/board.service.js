import { BoardModel } from "*/models/board.model";

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

    // Add card to each column
    /**
     * filter tìm những columnId trùng với column.id
     * rồi trả về một mảng mới cards trong column
     */
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });

    // Sort columns by columnOrder, sort cards by cardOrder, this step will pass to frontend dev

    // Remove cards data from boards
    delete board.cards;

    return board;
  } catch (error) {
    throw new Error(error); // error thì trở về controller
  }
};

export const BoardService = { createNew, getFullBoard };

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
    const result = await BoardModel.getFullBoard(boardId);
    return result;
  } catch (error) {
    throw new Error(error); // error thì trở về controller
  }
};

export const BoardService = { createNew, getFullBoard };

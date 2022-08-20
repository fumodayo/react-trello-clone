import { CardModel } from "*/models/card.model";
import { ColumnModel } from "*/models/column.model";

const createNew = async (data) => {
  try {
    // transaction mongodb
    const createdCard = await CardModel.createNew(data);

    const getNewCard = await CardModel.findOneById(
      createdCard.insertedId.toString()
    );

    // update cardOrder Array in column collection
    await ColumnModel.pushCardOrder(
      getNewCard.columnId.toString(),
      getNewCard._id.toString()
    );

    return getNewCard;
  } catch (error) {
    throw new Error(error); // error thì trở về controller
  }
};

export const CardService = { createNew };

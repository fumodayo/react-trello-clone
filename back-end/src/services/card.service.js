import { CardModel } from "*/models/card.model";

const createNew = async (data) => {
  try {
    // transaction mongodb
    const createdCard = await CardModel.createNew(data);
    const getNewCard = await CardModel.findOneById(
      createdCard.insertedId.toString()
    );

    return getNewCard;
  } catch (error) {
    throw new Error(error); // error thì trở về controller
  }
};

export const CardService = { createNew };

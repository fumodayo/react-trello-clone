import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";

// Define Card collection
const cardCollectionName = "cards";

// Định nghĩa kiểm soát dữ liệu truyền vào
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // also ObjectId when create new
  columnId: Joi.string().required(), // also ObjectId when create new
  title: Joi.string().required().min(3).max(50).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  // When deleting columns, cards are not deleted directly to the database, but stored in records
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false, // After running, all error shows (don't stop the part that got error)
  });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOne({
        _id: ObjectId(id),
      });
    return result;
  } catch (error) {
    throw new Error(error); // error thì trở về service
  }
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);

    // Validated boardId string -> ObjectId, columnId string -> ObjectId
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId),
    };

    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);

    return result;
  } catch (error) {
    throw new Error(error); // error thì trở về service
  }
};

export const CardModel = { cardCollectionName, createNew, findOneById };

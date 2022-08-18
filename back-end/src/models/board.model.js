import Joi from "joi";
import { getDB } from "*/config/mongodb";

// Define Board collection
const boardCollectionName = "boards";

// Định nghĩa kiểm soát dữ liệu truyền vào
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  // When deleting columns, cards are not deleted directly to the database, but stored in records
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, {
    abortEarly: false, // After running, all error shows (don't stop the part that got error)
  });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error); // error thì trở về service
  }
};

export const BoardModel = { createNew };

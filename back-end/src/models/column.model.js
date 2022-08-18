import Joi from "joi";
import { getDB } from "*/config/mongodb";

// Define Column collection
const columnCollectionName = "columns";

// Định nghĩa kiểm soát dữ liệu truyền vào
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // also ObjectId when create new
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  // When deleting columns, cards are not deleted directly to the database, but stored in records
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false, // After running, all error shows (don't stop the part that got error)
  });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ColumnModel = { createNew };

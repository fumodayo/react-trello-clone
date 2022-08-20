import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";

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

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
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

    // Validated boardId string -> ObjectId
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
    };

    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue);

    return result;
  } catch (error) {
    throw new Error(error); // error thì trở về service
  }
};

/**
 * @param {string} columnId
 * @param {string} cardId
 */

const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        { $push: { cardOrder: cardId } },
        { returnDocument: "after" } /*return log data after update*/
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        {
          _id: ObjectId(id), // Tìm phần từ = id truyền vào
        },
        { $set: data },
        {
          // Trả về bản ghi sau khi update (Không phải bản ghi trước khi update)
          returnDocument: "after",
        }
      );
    return result.value;
  } catch (error) {
    throw new Error(error); // error thì trở về service
  }
};

export const ColumnModel = {
  columnCollectionName,
  createNew,
  update,
  findOneById,
  pushCardOrder,
};

import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

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

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
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
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);

    return result;
  } catch (error) {
    throw new Error(error); // error thì trở về service
  }
};

/**
 * @param {string} boardId
 * @param {string} columnId
 */

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnDocument: "after" } /*return log data after update*/
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(boardId), // Tìm id trùng với boardId truyền vào
            _destroy: false,
          },
        },
        // {
        //   /**
        //    * Chỉ ghi đè trong quá trình query không ánh hưởng đến database
        //    * addFields add thêm các field mới nếu filed trùng key với hiện có trong định nghĩa
        //    * thì chuyển đổi ObjectId -> string sau đó gán vào _id
        //    */
        //   $addFields: {
        //     _id: { $toString: "$_id" },
        //   },
        // },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, // collection name
            localField: "_id",
            foreignField: "boardId",
            as: "columns", // trả về columns Array tìm được
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName, // collection name
            localField: "_id",
            foreignField: "boardId",
            as: "cards", // trả về cards Array tìm được
          },
        },
      ])
      .toArray();

    return result[0] || {};
  } catch (error) {
    throw new Error(error); // error thì trở về service
  }
};

export const BoardModel = {
  createNew,
  getFullBoard,
  pushColumnOrder,
  findOneById,
};

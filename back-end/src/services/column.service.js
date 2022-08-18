import { ColumnModel } from "*/models/column.model";

const createNew = async (data) => {
  try {
    const result = await ColumnModel.createNew(data);
    return result;
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
    const result = await ColumnModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error); // error thì trở về controller
  }
};

export const ColumnService = { createNew, update };

import { MongoClient } from "mongodb";
import { env } from "./environment";

/**
 * Kết nối một lần lưu ra dbInstance để sử dụng không cần kết nối nhiều lần
 * client.close() sẽ tự động thực thi sau khi chạy lại
 */
let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // Connect the client to the server
  await client.connect();

  // Assign clientDB to our dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};

// Get Database Instance
export const getDB = () => {
  if (!dbInstance) throw new Error("Must connect to Database first!");
  return dbInstance;
};

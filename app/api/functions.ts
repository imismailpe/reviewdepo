import { MongoClient, ObjectId } from "mongodb";

//cached client for single connection
let dbClient: MongoClient | null = null;
export async function getMongoClient() {
  if (!dbClient) {
    //connect to db
    dbClient = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@reviewdepocluster.zo36fn8.mongodb.net/?retryWrites=true&w=majority&appName=ReviewDepoCluster`
    );
  }
  return dbClient;
}

export async function getAllDocuments(
  collection: string,
  filter: [],
  sortBy: string
) {
  try {
    const client = await getMongoClient();
    const db = client.db();
    const documents = db
      .collection(collection)
      .find(filter)
      .sort(sortBy)
      .toArray();
    return { success: true, data: documents };
  } catch (error) {
    return { success: false, data: [], message: error };
  }
}
export async function getDocumentById(collection: string, id: string) {
  try {
    const client = await getMongoClient();
    const db = client.db("reviewDepoDB");
    const docId = new ObjectId(id);
    const documents = await db
      .collection(collection)
      .find({ _id: docId })
      .toArray();
    // client.close();
    return { success: true, data: documents };
  } catch (error) {
    return { success: false, data: [], message: error };
  }
}

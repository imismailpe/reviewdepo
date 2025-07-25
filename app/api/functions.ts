import { MongoClient, ObjectId, Sort } from "mongodb";

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
  filter: {},
  sortBy: Sort | [string, 1 | -1][]
) {
  try {
    const client = await getMongoClient();
    const db = client.db("reviewDepoDB");
    const documents = await db
      .collection(collection)
      .find(filter)
      .sort(sortBy)
      .toArray();
    return { success: true, data: documents };
  } catch (error) {
    console.log("inside getAllDocuments", error);
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
export async function insertDocument(collection: string, data: {}) {
  try {
    const client = await getMongoClient();
    const db = client.db("reviewDepoDB");
    const result = await db.collection(collection).insertOne(data);
    return {
      success: result.acknowledged,
      data: result.insertedId,
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function updateDocument(collection: string, id: string, data: {}) {
  try {
    const client = await getMongoClient();
    const db = client.db("reviewDepoDB");
    const docId = new ObjectId(id);
    const result = await db.collection(collection).updateOne(
      {
        _id: docId,
      },
      {
        $set: data,
      }
    );

    return {
      success: result.acknowledged,
      data: result.modifiedCount,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}
export async function deleteDocument(collection: string, id: string) {
  try {
    const client = await getMongoClient();
    const db = client.db("reviewDepoDB");
    const docId = new ObjectId(id);
    const result = await db.collection(collection).deleteOne({ _id: docId });
    return {
      success: result.acknowledged,
      data: result.deletedCount,
    };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}

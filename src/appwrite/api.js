import { Query } from "appwrite";
import { database, appwriteConfig } from "./config";

const { databaseID, messagesCollectionID, } = appwriteConfig;

/**
 * ! GET MESSAGES COLLECTIONS
 */
export const getMessages = async () => {
    const response = await database.listDocuments(
        databaseID,
        messagesCollectionID,
        [
            Query.orderDesc('$createdAt'),
            Query.limit(20)
        ]
    );
    return response;
}



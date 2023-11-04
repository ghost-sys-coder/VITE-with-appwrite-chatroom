import { Client, Databases, Account } from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECTID,
    url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
    databaseID: import.meta.env.VITE_APPWRITE_DATABASE_URL,
    messagesCollectionID: import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_URL
}


export const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const database = new Databases(client);

export const account = new Account(client);


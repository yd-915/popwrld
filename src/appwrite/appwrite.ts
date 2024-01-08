import { LoginInterface, RegisterInterface } from "@/interfaces/auth.interface";
import {
  Account,
  Client as Appwrite,
  Databases,
  ID,
  Query,
  Storage,
} from "appwrite";

const databaseId = "first12345";

const collectionId = "659c496222119edc17a6"

let api: any = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("659c30aa4ecd04110eaa");
    const account = new Account(appwrite);
    const database = new Databases(appwrite);
    const storage = new Storage(appwrite);

    api.sdk = { database, account, storage };
    return api.sdk;
  },

  createAccount: (registerBody: RegisterInterface) => {
    return api
      .provider()
      .account.create(
        ID.unique(),
        registerBody.email,
        registerBody.password,
        registerBody.fullName
      );
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createSession: (loginBody: LoginInterface) => {
    return api
      .provider()
      .account.createEmailSession(loginBody.email, loginBody.password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId: string, data: JSON, permissions: any) => {
    return api
      .provider()
      .database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        data,
        permissions
      );
  },

  getDocuments: (collectionId: string, query: any) => {
    return api
      .provider()
      .database.listDocuments(databaseId, collectionId, query);
  },

  getDocument: (collectionId: string, documentId: string) => {
    return api
      .provider()
      .database.getDocument(databaseId, collectionId, documentId);
  },

  updateDocument: (collectionId: string, documentId: string, data: JSON) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  deleteDocument: (collectionId: string, documentId: string) => {
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },

  createFile: (file: any) => {
    return api
      .provider()
      .storage.createFile("659c3509ec7659798423", ID.unique(), file);
  },

  getFilePreview: (fileId: string) => {
    return api
      .provider()
      .storage.getFileView("659c3509ec7659798423", fileId);
  },
};

export default api;

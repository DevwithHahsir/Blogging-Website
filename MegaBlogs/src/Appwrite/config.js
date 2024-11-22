/* eslint-disable no-unused-vars */
import conf from "../Config/conf";
import { ID, Client, Databases, Storage, Query } from "appwrite";

export class AuthService {
  client = new Client();
  // variable name
  databases;
  bucket; // storage
  ID;

  constructor() {
    this.client
      .setProject(conf.appwriteurl)
      .setEndpoint(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // create a post

  async CreatePost({ title, slug, content, featuredImage, status, UserId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectioIid,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          UserId,
        }
      );
    } catch (erorr) {
      console.log("AppWrite Databes Erorr", erorr);
    }
  }

  //  update document

  async UpdateDocument(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectioIid,
        // document id
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("UpdteDocument :: Databeses :: giving erorr", error);
    }
  }

  // delete document

  async DeleteDocument(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectioIid,
        slug
      );
      return true; // show on frontend that docuent is deleted
    } catch (error) {
      console.log("DeleteDocument :: Databeses :: giving erorr", error);
      return false;
    }
  }

  // get a singlePost

  async getdocument(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectioIid,
        slug
      );

      return true;
    } catch (error) {
      console.log("GetDocument :: Databeses :: giving erorr", error);
      return false;
    }
  }

  //use query method to find all documents/post

  // queries =variable
  // [] array
  // Query is keyword
  // (pass 2 variables)
  async getAllDocuments(
    queries = [Query.equal("status", "active")] //  uppler line states that call that post/documents whose status is equal to active
  ) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectioIid,
        queries
      );
    } catch (error) {
      console.log("GetAllDocument :: Databeses :: giving erorr", error);
      return false;
    }
  }

  // upload file

  async UploadFile(file) {
    try {
      return await this.Storage.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("uploadDocument :: Databeses :: giving erorr", error);
      return false;
    }
  }

  // delete file   it will take file id
  async DeleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("DeleteDocument :: Databeses :: giving erorr", error);
      return false;
    }
  }


  async GetFilePreview(fileId)
  {
    try {
        this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
        
    } catch (error) {
        console.log("GetDocumentPreview :: Databeses :: giving erorr", error);
      return false;
        
    }

  }
}

const authservice = new AuthService();
export default authservice;

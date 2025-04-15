import conf from "../conf/conf.";
import { Client, Account, Databases, Storage, ID, Query} from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    // This is safe and straightforward because Client() doesn't need anything extra to be constructed—it’s just an empty Appwrite client at that point.
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    // created alaag se so if kal ko you want to switch to mongo or something
    async createPost ({title , slug , content , featuredImage}) 
    // createPost method is not implemented yet
    {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    // attributes
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite syntax :: createPost :: error");
            
        }
    }   

    async updatePost (slug,{ title , content , featuredImage , status}) {
        // slug is a string (used as the document ID).
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    // attributes
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch (error) {
            console.log("appwrite syntax :: updatePost :: error", error);
            
        }
    }

    async deletePost (slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite syntax :: deletePost :: error", error);
        }
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite syntax :: getPost :: error", error);
            return false;
        }
    }

    async getPosts (queries = [Query.equal("status", "active")]) {
        // to get all the posts that are active 
        // can be used only when index is created in appwrite console ie. status is indexed
        await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )

        
}
// file uploading services
    async uploadFile (file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            console.log("appwrite syntax :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile (fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("appwrite syntax :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePriview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service();
// obj service is an instance of Service class
// new Service() creates a new object of the Service class , when new keyword is used, constructor is called .


export default service;
// export object not class so that we can use it in other files
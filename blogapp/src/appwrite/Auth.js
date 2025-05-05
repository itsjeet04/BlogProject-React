// take help from docs 


// 🏛️ Client is like the door to the library
// Account is like your library card
// 📖 Database is where your books are kept


import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

// A class called AuthService
export class AuthService {
    client = new Client();  // initialized directly
    //This is safe and straightforward because Client() doesn't need anything extra to be constructed—it’s just an empty Appwrite client at that point.You could even move this to the constructor too
    // You can’t create an Account object before Client is fully configured.
    account; // declared here, initialized in the constructor. You need the client to be configured first (via setEndpoint and setProject) before you can safely use it to create an Account.
    


    // This sets up the Appwrite client:
    constructor() {
        // A constructor is a special method that runs automatically when you create an object from a class. It’s used to initialize that objectZ
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        // And by passing this.client into Account, it's linking it to the specific project & server you've just configured.
            
    }

    // deconstructing the parameters    
    async createAccount({email, password, name}) {
        // can fail so we need to use try catch block
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

     // created alaag se so if kal ko you want to switch to mongo or something

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
// “Hey app! I’m creating one ready-to-use object from the AuthService class and giving it to anyone who imports it.”
export default authService
// taki bana bana obj hi seedha export kar do


// In your components or other services, you can now just do:
// import authService from 'path/to/AuthService.js';
// authService.login({ email, password });

// else 
// import { AuthService } from 'path/to/AuthService.js';
// const auth = new AuthService();
// auth.login(...);
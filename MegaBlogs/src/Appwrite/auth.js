import conf from "../Config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl) // Appwrite endpoint
      .setProject(conf.appwriteProjectId); // Appwrite project ID
    this.account = new Account(this.client);
  }

  // Create account function
  async createAccount({ email, password }) {
    try {
      const UserAccount = await this.account.create(
        ID.unique(),
        email,
        password
      );

      if (UserAccount) {
        // If account creation is successful, log the user in
        return this.login({ email, password });   // call login service
      } else {
        return UserAccount;
      }
    } catch (error) {
      console.error("Failed to create account:", error.message);
      throw new Error("Account creation failed. Please try again.");
    }
  }

  // Login function
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.error("Failed to login:", error.message);
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  // Log out
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Failed to logout:", error.message);
      throw new Error("Logout failed. Please try again.");
    }
  }

  // Get account
  async GetCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AppWrite Error", error);
    }

    return null;
  }
}

// Export an instance of AuthService
const authservice = new AuthService();

export default authservice;

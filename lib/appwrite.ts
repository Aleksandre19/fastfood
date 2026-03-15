import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.fast.food",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    collectionId: 'user'
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform)

    export const account = new Account(client);
    export const database = new Databases(client);
    const avatars = new Avatars(client);


export const createUser = async ({email, password, name}: CreateUserParams) => {
    
    // By defining the newAccount with the `let` keyword avoides the orphan account creation.
    let newAccount;

    try {
        newAccount = await account.create({userId: ID.unique(), email, password, name});

        if (!newAccount) throw new Error('Account creation failed');

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        return await database.createDocument({
            databaseId: appwriteConfig.databaseId,
            collectionId: appwriteConfig.collectionId,
            documentId: ID.unique(),
            data: {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl
            }
        });

    } catch (error) {
        if(newAccount) {
            try {
                await account.deleteSession({sessionId: 'current'});
            } catch { /* ignore cleanup errors */ }
        }
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession({ email, password});
        
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getCurrentUser =  async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw new Error('Could not find user');

        const currentUser = await database.listDocuments({
            databaseId: appwriteConfig.databaseId,
            collectionId: appwriteConfig.collectionId,
            queries: [Query.equal('accountId', currentAccount.$id)]
        });

        if(!currentUser) throw new Error('User document not found');
        
        return currentUser.documents[0];

    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}


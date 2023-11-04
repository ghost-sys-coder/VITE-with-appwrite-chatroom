import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwrite/config";
import { ID } from "appwrite";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getUserOnLoad();
    }, [])

    /** persist the logged in user */
    const getUserOnLoad = async () => {
        try {
            const accountSession = await account.get();
            setUser(accountSession);
            console.log("user session", accountSession);
        } catch (error) {
            console.info(error);
            // throw Error;
        } finally {
            setLoading(false)
        }
    }
    
    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        
        try {
            const response = await account.createEmailSession(credentials.email, credentials.password);
            console.log("logged in user", response);
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.log(error);
            throw Error;
        }
    }

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await account.create(
                ID.unique(),
                credentials.email,
                credentials.password,
                credentials.name,
            );
            await account.createEmailSession(credentials.email, credentials.password);
            const accountDetails = await account.get();
            console.log('account-details', accountDetails);
        } catch (error) {
            console.log(error);
            throw Error;
        }
    }

    const handleLogOut = async () => {
        await account.deleteSession("current");
        setUser(null);
    }

    const contextData = {
        user,
        handleUserLogin,
        handleLogOut,
        handleUserRegister
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <p>Loading...</p>
            ): (children)}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;
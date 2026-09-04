import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getMe,
    logoutUser,
} from "../api/auth.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================================
    // CHECK AUTHENTICATION
    // ================================
    const checkAuth = async () => {
        try {
            const data = await getMe();

            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Run once when application starts
    useEffect(() => {
        checkAuth();
    }, []);

    // ================================
    // LOGIN
    // ================================
    const login = (userData) => {
        setUser(userData);
    };

    // ================================
    // LOGOUT
    // ================================
    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                loading,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
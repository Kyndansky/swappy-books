import { getAuthenticationInfo } from "@/misc/api";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthInfo{
    isAuthenticated:boolean;
    isLoadingAuthentication:boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    username?:string;
}

const AuthContext = createContext<AuthInfo | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuthentication, setIsLoadingAuthentication] = useState(true);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        (async () => {
            const response = await getAuthenticationInfo();
            setIsAuthenticated(response.successful);
            setUsername(response.username);
            setIsLoadingAuthentication(false);
        })();
    }, []);

    const contextValue = { isAuthenticated, isLoadingAuthentication, setIsAuthenticated, username};

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth useUserComputerInfo must be used inside AuthContextProvider');
    }
    return context;
};
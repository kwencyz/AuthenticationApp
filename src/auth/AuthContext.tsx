import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as AuthService from './AuthService';
import { getStoredUser, saveUser, clearUser } from '../storage/authStorage';

type User = {
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const storedUser = await getStoredUser();
            setUser(storedUser);
            setIsLoading(false);
        })();
    }, []);

    const login = async (email: string, password: string) => {
        const loggedInUser = await AuthService.login(email, password);
        await saveUser(loggedInUser);
        setUser(loggedInUser);
    };

    const signup = async (name: string, email: string, password: string) => {
        const newUser = await AuthService.signup(name, email, password);
        await saveUser(newUser);
        setUser(newUser);
    };

    const logout = async () => {
        await clearUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

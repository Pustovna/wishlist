"use client"
import React from 'react';
import {
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from "@/app/firebase/firebase";

interface AuthContextType {
    user: any;
}

export const AuthContext = React.createContext<AuthContextType>({user: null});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
'use client'
import React from 'react';
import { auth } from '@/app/firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
    const [user] = useAuthState(auth);
    const handleLogout = () => {
        auth.signOut();
    };



    const consoleLog = () => { 
        if (!user) { 
            return "Who are you?";
        } else {
            console.log(auth.currentUser?.email);
        }
        return auth.currentUser?.email;
    }
    
    return (
       
        <div>
            <button
            type="button"
            className="rounded-lg text-sm p-1.5 inline-flex items-center bg-gray-800 hover:bg-gray-600 hover:text-white text-white"
            // onClick={consoleLog}
            >
                {consoleLog()}
            </button>
        
            {user && (
                <button
                type="button"
                className="rounded-lg text-sm p-1.5 inline-flex items-center bg-gray-800 hover:bg-gray-600 hover:text-white text-white"
                onClick={handleLogout}
                >
                    Log Out
                </button>
            )}
        </div>
        
    );

}

export default Topbar;
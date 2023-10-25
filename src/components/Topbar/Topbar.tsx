"use client";
import React from "react";
import { auth } from "@/app/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { authModalState } from "@/store/auth";
import { useRouter } from "next/navigation";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
  const [user] = useAuthState(auth);
  const handleLogout = () => {
    auth.signOut();
  };
  const router = useRouter();

  const handleButtonClick = () => {
    if (!user) {
        authModalState.getState().updateIsOpen(true);
        router.push("/auth");
    } else {
        return;
    }   
  };

  const getUser = () => {
    if (!user) {
      return "Login";
    }
    return auth.currentUser?.email;
  };

  return (
    <div>
      
        <button
          // onClick={(e) => updateType(typeAction === 'login' ? 'signup' : 'login')}
          onClick={(e) => handleButtonClick()}
          className="hover:bg-sky-700 p-3"
        >
          {getUser()}
        </button>
     
      {/* <button
        type="button"
        className="rounded-lg text-sm p-1.5 inline-flex items-center bg-gray-800 hover:bg-gray-600 hover:text-white text-white"
      >
        {getUser()}
      </button> */}

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
};

export default Topbar;

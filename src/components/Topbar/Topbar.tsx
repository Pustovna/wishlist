"use client";
import { auth } from "@/app/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { authModalState } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {

  const userFromAuth = useAuthState(auth);
  const [user, setUser] = useState(false);
  useEffect(() => {
   setUser(Boolean(userFromAuth[0]));
  }, []);

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

  return (
    <div>
      
        <button
          onClick={(e) => handleButtonClick()}
          className="hover:bg-sky-700 p-3"
        >        
          {user ? auth.currentUser?.email : "Login"}
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
};

export default Topbar;

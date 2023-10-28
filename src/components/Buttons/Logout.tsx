import { auth } from "@/app/firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";



export default function Logout() {
    const [signOut, loading, error] = useSignOut(auth);
    const handleLogout = () => {
        signOut();
      };

    return (
        <button
          type="button"
          className="rounded-lg text-sm p-1.5 inline-flex items-center bg-gray-800 hover:bg-gray-600 hover:text-white text-white"
          onClick={handleLogout}
        >
          Log Out
        </button>

    )
}



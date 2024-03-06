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
      className="header-button"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
}

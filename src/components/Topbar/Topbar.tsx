"use client";
import { auth } from "@/app/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { authModalState } from "@/store/auth";
import { useRouter } from "next/navigation";
import Logout from "../buttons/Logout";
import useHasMounted from "@/hooks/useHasMounted";


type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
  const hasMounted = useHasMounted();

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleButtonClick = () => {
    authModalState.getState().updateIsOpen(true);
    router.push("/auth");
  };

  const habdleGo = () => {
    router.push("/profile");
  }

  if (!hasMounted) return null;

  return (
    <div>
      {!user && (
        <button
          className="header-button"
          onClick={(e) => handleButtonClick()}
        >
          Login
        </button>
      )}
      {user && <button onClick={habdleGo} className="mx-3">{auth.currentUser?.email}</button>}
      {user && <Logout />}
    </div>
  );
};

export default Topbar;

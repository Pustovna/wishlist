"use client";
import { useEffect } from "react";
import { authModalState } from "@/store/auth";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { useRouter } from "next/navigation";


type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const typeAction = authModalState((state) => state.type);
  const isOpen = authModalState((state) => state.isOpen);
  const closeModal = useCloseModal();

  if (!isOpen) return null;
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        onClick={closeModal}
      ></div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="rounded-lg text-sm p-1.5 ml-auto inline-flex items-center bg-gray-800 hover:bg-gray-600 hover:text-white text-white"
                onClick={closeModal}
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>
			<div className="decoration-slate-50 text-gray-800 text-center">

				{typeAction === "login" ? <Login /> : typeAction === "register" ?  <Signup /> : <ResetPassword />}
			</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModal;

function useCloseModal() {
  const router = useRouter();

  const closeModal = () => {
    authModalState.getState().updateIsOpen(false);
    authModalState.getState().updateType("login");
    router.push("/product");
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return closeModal;
}

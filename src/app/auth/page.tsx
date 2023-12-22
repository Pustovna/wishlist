"use client";
import AuthModal from "@/components/Modals/AuthModal";
import { authModalState } from "@/store/auth";

export default function AuthPage() {
  const isOpen = authModalState((state) => state.isOpen);

  return <div>{isOpen && <AuthModal />}</div>;
}

"use client";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authModalState } from "@/store/auth";

export default function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password)
      return alert("Please fill all fields");
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      authModalState.getState().updateIsOpen(false);
      router.push("/product");
    } catch (error: any) {
      if (error) alert(`${error.message}`);
    }
  };

  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    authModalState.getState().updateType(type);
  };

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">
        Sign in to your best wishlist
      </h3>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-300">
          Your email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="
                  border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  bg-gray-600 text-white bg-gray-600 border-gray-500 placeholder-gray-400"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-300">
          Your password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="
                  border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  bg-gray-600 text-white bg-gray-600 border-gray-500 placeholder-gray-400"
          placeholder="*****"
        />
      </div>
      <button
        type="submit"
        className="w-full text-black font-medium rounded-lg text-sm px-5 ring ring-gray-300 hover:ring-gray-500 py-2.5 text-center bg-gray-300 hover:bg-gray-400"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button className="flex w-full justify-end">
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
          onClick={() => handleClick("forgotPassword")}
        >
          Forgot password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-300">
        Not registered yet?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("register")}
        >
          Create an account
        </a>
      </div>
    </form>
  );
}

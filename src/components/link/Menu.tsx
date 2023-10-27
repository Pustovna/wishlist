"use client"

import Link from "next/link";
import { authModalState } from "@/store/auth";

type Props = {
  href: string,
  label?: string,
  isNew?: boolean,
}



export default function LinkMenu({
  href,
  label,
  isNew
}: Props) {

  const handleButtonClick = () => {
    authModalState.getState().updateIsOpen(true);
  };

  return (
    <div>
      <span>Here will menu</span>
{/* 
      {/* <Link href="/auth">
      <button 
      // onClick={(e) => updateType(typeAction === 'login' ? 'signup' : 'login')}
      onClick={(e) => handleButtonClick()}
      className="hover:bg-sky-700 p-3">
         Change state
      </button>
      </Link> */}
     

{/*       
       
      <Link href={href} 
      className="text-sm text-slate-700 px-2 py-1 rounded-md
      hover:bg-slate-900 hover:text-slate-500 
      transition duration-200 ease-in-out">
      <span className="relative">
        {label}
        {isNew && <NewItem/>}
      </span>
      
    </Link> */} 
    </div>
    
  );
}


const NewItem = () => <span className="absolute bg-orange-400 w-2 h-2 rounded-full"></span>
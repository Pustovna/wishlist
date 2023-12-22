"use client";
import UserList from "@/components/UsersList/UserList";
import WishList from "@/components/WishList/WishList";
import { useState } from "react";


export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex">
     <UserList setLoading={setLoading}
      /> 
      <WishList  isOwner={false}/>
    </div>
  );
}
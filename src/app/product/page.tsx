"use client";
import UserList from "@/components/UsersList/UserList";
import WishList from "@/components/WishList/WishList";
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { userState } from "@/store/usres";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const updateUser = userState((state) => state.updateUser);
  
  useEffect(() => {
    updateUser(user.uid);
  }, []);

  return (
    <div className="flex">
      {!user ? (
        <div className="flex justify-center">Авторизируйся, пожалуйста</div>
      ) : (
        <>
          <UserList setLoading={setLoading} />
          <WishList isOwner={false} />
        </>
      )}
    </div>
  );
}

"use client";
import AllUsersList from "@/components/UsersList/AllUsersList";
import WishList from "@/components/WishList/WishList";
import { Suspense, useEffect } from "react";
import { userState } from "@/store/usres";
import { CardSkeleton } from "@/components/sceletons";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";

export default function Page() {
  // const [loading, setLoading] = useState(true);
  // const { user } = useAuthContext();
  const [user, loading] = useAuthState(auth);
  const updateUser = userState((state) => state.updateUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) return router.push("/");
    if (user.uid) {
      updateUser(user.uid);
    }
  }, [user]);

  return (
    <div className="main-container">
      {!user ? (
        <div className="flex justify-center">Авторизируйся, пожалуйста</div>
      ) : (
        <>
          <div className="sidebar-container overflow-y-hidden">
            {/* <ErrorBoundary fallback={<>Oh no! Do something!</>}>
               <UserList  uid={user.uid}/>
            </ErrorBoundary> */}

            <Suspense fallback={<CardSkeleton />}>
              <AllUsersList uid={user.uid} />
            </Suspense>
          </div>
          <WishList isOwner={false} />
        </>
      )}
    </div>
  );
}

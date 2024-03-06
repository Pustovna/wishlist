"use client";
import { auth } from "@/app/firebase/firebase";
import WishList from "@/components/WishList/WishList";
import { userState } from "@/store/usres";
import { wishState } from "@/store/wishList";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBarWrapper from "@/components/profile/Sidebar";
import ProfileSceleton, { CardSkeleton } from "@/components/sceletons";
import AllUsersList from "@/components/UsersList/AllUsersList";

export default function Page() {
  const [user, loading] = useAuthState(auth);
  const updateUser = userState((state) => state.updateUser);

  const changeIsNewWish = wishState((state) => state.changeIsNewWish);
  const router = useRouter();

  const handleNewWish = () => {
    changeIsNewWish(true);
  };

  useEffect(() => {
    if (!user) return router.push("/");
    if (user.uid) {
      updateUser(user.uid);
    }
  }, [user]);

  if (loading) return <p>loading...</p>;

  return (
    <>
      <div className="main-container">
        {user && (
          <div className="sidebar-container">
            <div className="flex flex-col mb-10">
              <Suspense fallback={<ProfileSceleton />}>
                <SideBarWrapper uid={user?.uid}></SideBarWrapper>
              </Suspense>
            </div>
            <div></div>
          </div>
        )}
        <div className="w-2/3">
          <div className="flex gap-10 ml-2">
            {/* <h5 className="text-teal-900 underline font-black">Список желаний</h5> */}
            <button
            title="add"
              onClick={handleNewWish}
              className="rounded-xl bg-teal-200 text-black px-1 py-1 hover:bg-sky-700 active:bg-sky-600"
            >
        
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Edit / Add_Plus">
                  <path
                    id="Vector"
                    d="M6 12H12M12 12H18M12 12V18M12 12V6"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>

          <WishList isOwner={true} />
        </div>
      </div>
    </>
  );
}

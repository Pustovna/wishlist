"use client";
import { auth, firestore } from "@/app/firebase/firebase";
import WishList from "@/components/WishList/WishList";
import ProfileForm from "@/components/forms/profileForm";
import FriendsReq from "@/components/profile/friends";
import User from "@/interfaces/Users";
import { deleteUserFromFriends, getUserName } from "@/services/Firebase";
import { userState } from "@/store/usres";
import { wishState } from "@/store/wishList";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { json } from "stream/consumers";

export default function Page() {
  const [user, loading] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<any>({});
  const [changeUserInfo, setchangeUserInfo] = useState<String>("");
  const changedData = userState((state) => state.changedData);
  const friendsList = userState((state) => state.friendsList);
  const friendsRequestList = userState((state) => state.friendsRequestList);

  const updateUser = userState((state) => state.updateUser);
  const updatefriendsList = userState((state) => state.updatefriendsList);
  const deleteFriends = userState((state) => state.deleteFriends);
  const updatefriendsRequestList = userState(
    (state) => state.updatefriendsRequestList
  );
  const updatefriendsWaitingList = userState(
    (state) => state.updatefriendsWaitingList
  );
  const updateChangedData = userState((state) => state.updateChangedData);
  const changeIsNewWish = wishState((state) => state.changeIsNewWish);
  const router = useRouter();

  const styleText = "text-red-300";

  const deleteFriend = async (id: string) => {
    try {
      if (user) {
        await deleteUserFromFriends(user.uid, id);
        await deleteUserFromFriends(id, user.uid);
        deleteFriends(id);
      }
    } catch (error) {
      console.error("Something wrong in handleAccept", error);
    }
  };

  const handleOpenChanges = (sorse: string) => {
    if (changeUserInfo === sorse) {
      setchangeUserInfo("");
      return;
    }
    setchangeUserInfo(sorse);
  };

  const handleNewWish = () => {
    changeIsNewWish(true);
  };

  useEffect(() => {
    if (changedData) {
      setUserInfo({ ...userInfo, ...changedData });
      setchangeUserInfo("");
    }
  }, [changedData]);

  useEffect(() => {
    if (!user) return router.push("/");
    if (user.uid) {
      updateUser(user.uid);
      const getCurrentUser = async () => {
        const docRef = doc(firestore, "usersWish", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const friends = docSnap.data().friends;
          const newFriends = friends.map((item: string) => {
            return {
              id: item,
              displayName: getUserName(item),
            };
          });
          updatefriendsList(newFriends);
          updatefriendsRequestList(docSnap.data().friendsRequest);
          updatefriendsWaitingList(docSnap.data().friendsWaiting);
          setUserInfo({
            ...userInfo,
            displayName: docSnap.data()?.displayName,
            email: docSnap.data().email,
          });
        } else {
          console.log("No such document!");
        }
      };
      getCurrentUser();
    }
  }, [user]);

  if (loading) return <p>loading...</p>;

  return (
    <>
      <h1 className="text-orange-300 text-lg text-center my-6">Profile</h1>
      <div className="flex">
        {userInfo && (
          <div className="flex min-w-80">
            <div className="mr-5">
              <div className="flex flex-col mr-5">
                <div className="border border-sky-500">
                  <div className="flex min-w-52">
                    <span className="mr-2">Имя</span>
                    <span className={styleText}>{userInfo.displayName}</span>
                  </div>
                  {changeUserInfo === "displayName" && auth.currentUser ? (
                    <>
                      <ProfileForm
                        uid={auth.currentUser.uid}
                        type="displayName"
                        func={() => null}
                      ></ProfileForm>
                      <button
                        onClick={() => handleOpenChanges("displayName")}
                        className="m-3"
                      >
                        Закрыть
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleOpenChanges("displayName")}
                      className="mx-3"
                    >
                      Изменить
                    </button>
                  )}
                </div>
              </div>
              <div className="border border-sky-500">
                {friendsList.length === 0 ? (
                  <div>
                    <span className={styleText}>У вас ещё нет друзей</span>
                  </div>
                ) : (
                  friendsList.map((item: any, index: number) => {
                    return (
                      <div key={index} className="flex gap-2 py-2 items-center	">
                        <p className={styleText}>{item.displayName}</p>
                        <button
                          onClick={() => deleteFriend(item.id)}
                          className="h-4 w-4 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })
                )}

                {changeUserInfo === "friends" && auth.currentUser ? (
                  <>
                    <ProfileForm
                      uid={auth.currentUser.uid}
                      type="friends"
                      func={() => handleOpenChanges("friends")}
                    ></ProfileForm>
                  </>
                ) : (
                  <button
                    onClick={() => handleOpenChanges("friends")}
                    className="mx-3"
                  >
                    добавить
                  </button>
                )}
              </div>
              <div className="border border-sky-500">
                <p>Запросы в друзья:</p>
                {friendsRequestList.length === 0 ? (
                  <div className={styleText}>Новых запросов в друзья нет</div>
                ) : (
                  friendsRequestList.map((item, index) => {
                    return (
                      <div key={index}>
                        <FriendsReq requester={item} />
                      </div>
                    );
                  })
                )}
              </div>
              <div className="border border-sky-500">
                {/* {!userInfo.picture ? (
                  <>
                    <p className={styleText}>У вас нет картинки</p>
                    <button
                      onClick={() => handleOpenChanges("picture")}
                      className="m-3"
                    >
                      Изменить
                    </button>
                  </>
                ) : (
                  <div className="flex">
                    <img
                      className="m-2"
                      src={userInfo.picture}
                      alt="user picture"
                    />
                    <button
                      onClick={() => handleOpenChanges("picture")}
                      className="m-3"
                    >
                      Изменить
                    </button>
                  </div>
                )} */}
              </div>
              <div>
                <button
                  onClick={handleNewWish}
                  className="rounded-xl bg-teal-200 text-black px-5 py-2 hover:bg-sky-700 active:bg-sky-600"
                >
                  Добавить вещичку
                </button>
              </div>
            </div>
          </div>
        )}

        <WishList isOwner={true} />
      </div>
    </>
  );
}

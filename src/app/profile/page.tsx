"use client";
import { auth, firestore } from "@/app/firebase/firebase";
import WishList from "@/components/WishList/WishList";
import ProfileForm from "@/components/forms/profileForm";
import User from "@/interfaces/Users";
import { userState } from "@/store/usres";
import { wishState } from "@/store/wishList";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Page() {
  const [user, loading] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [changeUserInfo, setchangeUserInfo] = useState<String>("");
  const changedData = userState((state) => state.changedData);
  const updateUser = userState((state) => state.updateUser);
  const changeIsNewWish = wishState((state) => state.changeIsNewWish);

  const styleText = "text-red-300";

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
    if (!user) return;
    if (user.uid) {
      updateUser(user.uid);
      const getCurrentUser = async () => {
        const docRef = doc(firestore, "usersWish", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data() as User);
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
                <div className="flex min-w-52">
                  <span className="mr-2">Имя</span>
                  <span className={styleText}>{userInfo.displayName}</span>
                </div>
                {changeUserInfo === "displayName" && auth.currentUser ? (
                  <>
                    <ProfileForm
                      uid={auth.currentUser.uid}
                      type="displayName"
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
              <p>{userInfo.email}</p>
              <div>
                {userInfo.friendRequest?.length === 0 ? (
                  <>
                    <span className="mr-2">Друзья</span>
                    <span className={styleText}>У вас ещё нет друзей</span>
                    <button
                      onClick={() => handleOpenChanges("friends")}
                      className="m-3"
                    >
                      Добавить
                    </button>
                  </>
                ) : (
                  userInfo.friendRequest?.map((item, index) => {
                    return (
                      <div key={index}>
                        <p className={styleText}>{item}</p>
                      </div>
                    );
                  })
                )}
              </div>
              <div>
                {!userInfo.picture ? (
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
                )}
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

        <WishList  isOwner={true}/>
      </div>
    </>
  );
}

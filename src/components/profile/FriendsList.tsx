import { Friend } from "@/interfaces/Users";
import { deleteUserFromFriends } from "@/services/Firebase";
import { useEffect, useState } from "react";
import ProfileForm from "../forms/profileForm";
import { userState } from "@/store/usres";

export default function FriendsList({
  uid,
  friendsList,
}: {
  uid: string;
  friendsList: [];
}) {
  const [changeUserInfo, setchangeUserInfo] = useState<String>("");
//   const [friendsListStore, setfriendsListStore] =
//     useState<Friend[]>(friendsList);
  const friendsListStore = userState((state) => state.friendsList);
  const deleteFriendFromStore = userState((state) => state.deleteFriends);
  const updatefriendsList = userState((state) => state.updatefriendsList);

  useEffect(() => {
    updatefriendsList(friendsList);
  }, []);

  const handleOpenChanges = (sorse: string) => {
    if (changeUserInfo === sorse) {
      setchangeUserInfo("");
      return;
    }
    setchangeUserInfo(sorse);
  };

  const deleteFriend = async (id: string) => {
    try {
      if (uid) {
        await deleteUserFromFriends(uid, id);
        await deleteUserFromFriends(id, uid);
        // const updatedFriendsList = friendsListStore.filter(
        //   (friend) => friend.id !== id
        // );
        deleteFriendFromStore(id);
        // updatefriendsList(updatedFriendsList);
      }
    } catch (error) {
      console.error("Something wrong in handleAccept", error);
      throw new Error("Something wrong in handleAccept");
    }
  };

  return (
    <>
      {friendsListStore.length === 0 ? (
        <div>
          <span className="">У вас ещё нет друзей</span>
        </div>
      ) : (
        friendsListStore.map((item: Friend, index: number) => {
          return (
            <div key={index} className="flex gap-2 py-2 items-center	">
              <p className="">{item.displayName}</p>
              <button
                title="Удалить друга"
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

      {changeUserInfo === "friends" ? (
        <>
          <ProfileForm
            uid={uid}
            type="friends"
            func={() => handleOpenChanges("friends")}
          ></ProfileForm>
        </>
      ) : (
        <button onClick={() => handleOpenChanges("friends")} className="mx-3">
          добавить
        </button>
      )}
    </>
  );
}



import {
  acceptFriend,
  deleteUserFromRequest,
  deleteUserFromWaiting,
  getUserName,
} from "@/services/Firebase";
import { userState } from "@/store/usres";
import { useEffect, useState } from "react";

type FriendsReqProps = {
  requester: string;
};

export default function FriendsReq({ requester }: FriendsReqProps) {
  const [name, setName] = useState("");
  const uid = userState((state) => state.user);
  const deleteFromRequests = userState((state) => state.deleteFromRequests); 
  const addFriends = userState((state) => state.addFriends);

  const handleAccept = async (requester: string, uid: string) => {
    try {
      await acceptFriend(requester, uid);
      await acceptFriend(uid, requester);
   
      await deleteUserFromWaiting(requester, uid);
      await deleteUserFromRequest(requester, uid);
      deleteFromRequests(requester);
      addFriends(requester);
    } catch (error) {
      console.error("Something wrong in handleAccept", error);
    }
  };

  const handleReject = async(requester: string, uid: string) => {
    try {
      await deleteUserFromWaiting(requester, uid);
      await deleteUserFromRequest(requester, uid);
      deleteFromRequests(requester);
    } catch (error) {
      console.error("Something wrong in handleAccept", error);
    }
  }

  useEffect(() => {
    const getName = async () => {
      const newName = await getUserName(requester);
      setName(newName);
    };
    getName();
  }, []);

  if (!name) return;

  return (
    <div className="flex my-4">
      {name}
      <button
        onClick={() => handleAccept(requester, uid)}
        type="button"
        className="bg-indigo-500 mx-2  px-2"
      >
        Да!
      </button>
      <button onClick={() => handleReject(requester, uid)} type="button" className="bg-indigo-500 mx-2 px-2">
        Нет!
      </button>
    </div>
  );
}

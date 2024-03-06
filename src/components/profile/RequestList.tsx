import { useEffect, useState } from "react";
import FriendsReq from "./Friends";
import { Friend } from "@/interfaces/Users";
import { userState } from "@/store/usres";

export default function RequestList({
  uid,
  requestList,
}: {
  uid: string;
  requestList: string[];
}) {
//   const [friendsListStore, setfriendsListStore] =
//     useState<string[]>(requestList);
  const friendsRequestList = userState((state) => state.friendsRequestList);
  const updatefriendsRequestList = userState(
    (state) => state.updatefriendsRequestList
  );

  useEffect(() => {
    updatefriendsRequestList(requestList);
  }, []);

  return (
    <div className="border border-sky-500">
      <p>Запросы в друзья:</p>
      {friendsRequestList.length === 0 ? (
        <div className="">Новых запросов в друзья нет</div>
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
  );
}

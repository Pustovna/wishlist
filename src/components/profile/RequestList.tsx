import { useEffect } from "react";
import FriendsReq from "@/components/profile/Friends";
import { userState } from "@/store/usres";

export default function RequestList({
  uid,
  requestList,
}: {
  uid: string;
  requestList: [];
}) {

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

"use server";
import {
  getAllUsers,
  getFriendsList,
  getRequestList,
  getWaitingList,
} from "@/services/FirebaseUsers";

export const getListUsers = async () => {
  try {
    const allUsers = await getAllUsers();
    return allUsers;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getListFriends = async (uid: string) => {
  try {
    const friends = await getFriendsList(uid);
    return friends;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getListWaiting = async (uid: string) => {
  try {
    const waitingList = await getWaitingList(uid);
    return waitingList;
  } catch (error){
    console.log(error);
    throw new Error();
  }
};

const getListReq = async (uid: string) => {
  try {
    const reqList = await getRequestList(uid);
    return reqList;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

type FriendsItemProps = {
  status: "friend" | "waiting" | "not friend";
  UserName: string | null;
  uid: string;
};

export async function fullList(uid: string) {
    const allUsers = await getListUsers();
    const friends = await getListFriends(uid);
    const waiting = await getListWaiting(uid);
    const requerst = await getListReq(uid);

    const usersList: FriendsItemProps[] = [];

    if (!allUsers) throw new Error("Error occurred with the database");

    allUsers.map((item) => {
      if (item.uid === uid) return;
      const user: FriendsItemProps = {
        status: "not friend",
        UserName: item.displayName,
        uid: item.uid,
      };

      const isFriend = friends.includes(user.uid);
      const isWaiting = waiting.includes(user.uid);
      const isReq = requerst.includes(user.uid);

      isFriend
        ? (user.status = "friend")
        : isWaiting || isReq
        ? (user.status = "waiting")
        : (user.status = "not friend");

      usersList.push(user);
    });

    return usersList;
};

// const FriendsItem = ({ status, UserName, uid } : FriendsItemProps) => {
//   //   const [icon, setIcon] = useState<String>(status);
//   //   const deleteFriend = () => {
//   //     console.log("delete");
//   //   };

//   // const addFriend = () => {
//   //   if (uid) {
//   //     addFriends(uid, UserName).then((res) => {
//   //       setIcon("waiting");
//   //       console.log(res);
//   //     });
//   //   }
//   // };

//   return (
//     <div className="flex justify-between my-5">
//       <p className="break-all mr-4 text-left">{UserName}</p>

//       {status === "friend" && (
//         <button
//           className="button-user button-delete py-2.5"
//           //   onClick={deleteFriend}
//         ></button>
//       )}
//       {status === "waiting" && (
//         <button className="button-user button-waiting py-2.5 pointer-events-none"></button>
//       )}

//       {status === "not friend" && (
//         <button
//           className="button-user button-add py-2.5"
//           // onClick={addFriend}
//         ></button>
//       )}
//     </div>
//   );
// };

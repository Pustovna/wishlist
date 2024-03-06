import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase";
import { getUserName } from "@/services/Firebase";

export async function fetchUserData(uid: string) {
  try {
    const docRef = doc(firestore, "usersWish", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const friendsRequestList = docSnap.data().friendsRequest;
      const friendsWaitingList = docSnap.data().friendsWaiting;
      const friends = docSnap.data().friends;
      const newFriendsList = friends.map((item: string) => {
        return {
          id: item,
          displayName: getUserName(item),
        };
      });
      const displayName = docSnap.data()?.displayName;
      const email = docSnap.data().email;

      return {
        name: displayName, 
        userEmail: email, 
        requestList: friendsRequestList,
        waitingList: friendsWaitingList, 
        friendsList: newFriendsList
      }
    } else {
      throw new Error(); 
    }
  } catch (error) {
    console.error("User Data Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}

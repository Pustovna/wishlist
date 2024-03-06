import { firestore } from "@/app/firebase/firebase";
import { User } from "@/interfaces/Users";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

export async function getAllUsers() {
  const q = query(collection(firestore, "usersWish"));
  const querySnapshot = await getDocs(q);
  const tmp: User[] = [];

  querySnapshot.forEach((doc) => {
    tmp.push({ uid: doc.id, ...doc.data() } as User);
  });
  return tmp;
}

export async function getFriendsList(uid: string) {
    const docRef = doc(firestore, "usersWish", uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data().friends;
    } else {
      console.log("No such document!");
      return null;
    }
  }

  export async function getWaitingList(uid: string) {
    const docRef = doc(firestore, "usersWish", uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data().friendsWaiting;
    } else {
      console.log("No such document!");
      return null;
    }
  }

  export async function getRequestList(uid: string) {
    const docRef = doc(firestore, "usersWish", uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data().friendsRequest;
    } else {
      console.log("No such document!");
      return null;
    }
  }
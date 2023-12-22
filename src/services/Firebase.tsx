import { firestore } from "@/app/firebase/firebase";
import User from "@/interfaces/Users";
import { wishState } from "@/store/wishList";
import { rejects } from "assert";
import {
  addDoc,
  deleteDoc,
  deleteField,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { resolve } from "path";
import React, { use } from "react";
import { useEffect, useState } from "react";

export function useGetUsers(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<User[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      setLoading(true);
      const q = query(collection(firestore, "usersWish"));
      const querySnapshot = await getDocs(q);
      const tmp: User[] = [];

      querySnapshot.forEach((doc) => {
        tmp.push({ uid: doc.id, ...(doc.data() as User) });
      });
      setProblems(tmp);
      setLoading(false);
    };
    getProblems();
  }, [setLoading]);
  return problems;
}

export async function updateData(uid: string, data: {}) {
  const sfDocRef = doc(firestore, "usersWish", uid);
  try {
    await runTransaction(firestore, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      transaction.update(sfDocRef, { ...data });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
}

export async function getUser(uid: string) {
  const docRef = doc(firestore, "usersWish", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export async function getWishList(uid: string) {
  const docRef = doc(firestore, "wishLists", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export async function getThink(id: string) {
  const docRef = doc(firestore, "things", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

// export async function addThing(
//   data: {
//     name: string;
//     link: string;
//     picture: string;
//     price: string;
//     comment: string;
//     createdAt: string;
//   },
//   uid: string
// ) {
//   const docRef = await addDoc(collection(firestore, "things"), {
//     name: data.name,
//     link: data.link,
//     picture: data.picture,
//     price: data.price,
//     createdAt: data.createdAt,
//   });

//   try {
//     const sfDocRef = doc(firestore, "wishLists", uid); // get ref wishList by uid
//     if (!sfDocRef) return console.log("no doc"); // if hasn't wishList return error message

//     runTransaction(firestore, async (transaction) => {
//       const sfDoc = await transaction.get(sfDocRef); // get data from wishList
//       if (!sfDoc.exists()) {
//         throw "Document does not exist!"; // if hasn't wishList return error message
//       }
//       const newArr = sfDoc.data()?.list;
//       if (newArr.length !== 0) {
//         newArr.push({
//           id: docRef.id,
//           comment: data.comment,
//           price: data.price,
//         });
//       } else {
//         newArr.push({
//           id: docRef.id,
//           comment: data.comment,
//           price: data.price,
//         });
//       }
//       transaction.update(sfDocRef, { list: newArr });
//       console.log("Transaction successfully committed!");
//       return newArr;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function addThing(
  data: {
    name: string;
    link: string;
    picture: string;
    price: string;
    comment: string;
    createdAt: string;
  },
  uid: string
) {
  return new Promise((resolve, reject) => {
    addDoc(collection(firestore, "things"), {
      name: data.name,
      link: data.link,
      picture: data.picture,
      price: data.price,
      createdAt: data.createdAt,
    })
      .then((docRef) => {
        const sfDocRef = doc(firestore, "wishLists", uid);
        if (!sfDocRef) {
          console.log("no doc");
          reject("no doc");
        } else {
          runTransaction(firestore, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
              reject("Document does not exist!");
            }
            const newArr = sfDoc.data()?.list || [];
            newArr.push({
              id: docRef.id,
              comment: data.comment,
              price: data.price,
            });
            transaction.update(sfDocRef, { list: newArr });
            console.log("Transaction successfully committed!");
            resolve(newArr);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export async function deleteThing(uid: string, idWish: string) {

  return new Promise((resolve, rejects) => {
    const docRef = doc(firestore, "wishLists", uid);
    if (!docRef) return rejects('no doc');
    runTransaction(firestore, async (transaction) => {
      const sfDoc = await transaction.get(docRef); // get data from wishList
      if (!sfDoc.exists()) {
        rejects("Document does not exist!"); // if hasn't wishList return error message
      }
      const newArr = sfDoc.data()?.list;
      
      let index;
      if (newArr.length !== 0) {
        index = newArr.findIndex(
          (
            wish: { comment: string; id: string; price: string }
          ) => {
            if (wish.id === idWish) return true;
            return false;
          }
        );
        if (index >= 0) {
          newArr.splice(index, 1);
          console.log("deleting was successfully");
          transaction.update(docRef, { list: newArr });
          resolve(newArr);
        }        
      }
      rejects('does not find such id');
    });
  })
}



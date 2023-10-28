import { firestore } from "@/app/firebase/firebase";
import User from "@/interfaces/Users";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React from "react";
import { SetStateAction, useEffect, useState } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';


// export default function FirestoreCollection() {
//   const [value, loading, error] = useCollection(
//     collection((firestore), 'usersWish')
//   );
//   return (
//     <div>
//       <p>
//         {error && <strong>Error: {JSON.stringify(error)}</strong>}
//         {loading && <span>Collection: Loading...</span>}
//         {value && (
//           <span>
//             Collection:{' '}
//             {value.docs.map((doc) => (
//               <React.Fragment key={doc.id}>
//                 {JSON.stringify(doc.data())},{' '}
//               </React.Fragment>
//             ))}
//           </span>
//         )}
//       </p>
//     </div>
//   );
// };


export function getUsers() {
    const [value, loading, error] = useCollection(
        collection((firestore), 'usersWish')
      );

      const users: User[] = [];
      
      if (value) {
        value.docs.map( (user, i) => {
          users.push({uid: user.id, ...user.data() as User});
        })
      }
      
    
      if (users.length > 0) {
        return users;
      }
      
}
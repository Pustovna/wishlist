import ProductCard from "@/components/ProductCard";
import { useGetUsers } from "@/services/Firebase";
import { userState } from "@/store/usres";
import { useEffect, useState } from "react";
import { fullList } from "../Modals/FriendsList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";
import { useAuthContext } from "@/app/context/AuthContext";

type UserListProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type FriendsItemProps = {
  status: "friend" | "waiting" | "not friend";
  UserName: string | null;
  uid: string;
};

const UserList: React.FC<UserListProps> = ({ setLoading }) => {
  const [allUsers, setallUsers] = useState<FriendsItemProps[]>([]);
  // const users = useGetUsers(setLoading);
  const { user } = useAuthContext();
 
  useEffect(() => {
    const usersData = async () => {
      setLoading(true);
      if (!user) return;
      try {
        const res = await fullList(user.uid);
        setallUsers(res);
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователей:", error);
      } finally {
        setLoading(false);
      }
    };
    usersData();
  }, []);


  return (
    <div className="overflow-y-auto w-[40%] bg-blue-950 p-5 mr-10">
      <div className=" text-sm pt-4 flex flex-col  gap-4 ">
        {/* {allUsers.length === 0 && <div>There is no users</div>} */}
        
        {allUsers.length > 0 &&
          allUsers.map((item, i) => {
            return (
              <ProductCard
                key={i}
                // id={product.id}
                UserName={item.UserName}
                uid={item.uid}
                status={item.status}
              />
            );
          })}
      </div>
    </div>
  );
};

export default UserList;

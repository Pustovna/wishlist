import { fullList } from "@/services/userList";
import AllFriendList from "@/components/mainPage/AllFriendList";

// type UserListProps = {
//   // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   uid: string;
// };

type FriendsItemProps = {
  status: "friend" | "waiting" | "not friend";
  UserName: string | null;
  uid: string;
};

export default async function AllUsersList({ uid }: { uid: string }) {
  // const [allUsers, setallUsers] = useState<FriendsItemProps[]>([]);
  // const users = useGetUsers(setLoading);
  // const { user } = useAuthContext();

  // useEffect(() => {
  //   const usersData = async () => {
  //     // setLoading(true);
  //     // if (!user) return;
  //     try {
  //       const res = await fullList(uid);
  //       setallUsers(res);
  //     } catch (error) {
  //       console.log("Ошибка при загрузке данных пользователей:", error);
  //       throw new Error("Error occurred with the database");
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };
  //   usersData();
  // }, []);

  const allUsers:FriendsItemProps[] = await fullList(uid);
  
  

  return (
    <div className="text-sm  flex flex-col gap-4 h-full overflow-y-auto scrollbar-tiny">
      <AllFriendList fiends={allUsers}></AllFriendList>
      {/* {allUsers.length > 0 &&
        allUsers.map((item, i) => {
          return (
            <div key={i}>{item.UserName}</div>
            <ProductCard
              key={i}
              // id={product.id}
              UserName={item.UserName}
              uid={item.uid}
              status={item.status}
            />
          );
        })} */}
    </div>
  );
}


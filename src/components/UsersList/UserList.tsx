import ProductCard from "@/components/ProductCard";
import { useGetUsers } from "@/services/Firebase";

type UserListProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserList: React.FC<UserListProps> = ({ setLoading }) => {
  const users = useGetUsers(setLoading);

  return (
    <div className="overflow-y-auto h-[90vh] w-[40%] bg-blue-950 p-5">
      <div className=" text-sm pt-4 flex flex-col  gap-4 ">
        {users && users.length === 0 && <div>There is no users</div>}
        {users &&
          users.map((item, i) => {
            return (
              <ProductCard
                key={i}
                // id={product.id}
                displayName={item.displayName}
                uid={item.uid}
                email={null} // price={product.price}
              />
            );
          })}
      </div>
    </div>
  );
};

export default UserList;

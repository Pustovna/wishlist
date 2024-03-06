import { ProductCard } from "./ProductCard";


type FriendsItemProps = {
    status: "friend" | "waiting" | "not friend";
    UserName: string | null;
    uid: string;
  };
  
export default function AllFriendList({ fiends }: { fiends: FriendsItemProps[] }) {
    return (
      <>
        {fiends.length > 0 &&
          fiends.map((item, i) => {
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
      </>
    );
  }
  
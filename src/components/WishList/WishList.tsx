import { getWishList } from "@/services/Firebase";
import { userState } from "@/store/usres";
import { useEffect, useState } from "react";
import WishItem from "./WishItem/WishItem";
import WishForm from "./WishForm/WishForm";
import { wishState } from "@/store/wishList";
import getFullThink from "@/app/utils/utils";

type WishListProps = {
  isOwner: boolean;
};

const WishList: React.FC<WishListProps> = ({ isOwner }) => {
  const uid = userState((state) => state.user);
  const [wishes, setWishes] = useState<{}>({});
  const isOpenNewWish = wishState((state) => state.isNewWish);

  useEffect(() => {
    if (!uid) return;
    getFullThink(uid).then((res) => {
      if (!res) return;
      setWishes({ ...res });
    });

    // getWishList(uid)
    //   .then((res) => {
    //     setWishes({ ...res?.list });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [uid]);

  const addNewWish = () => {
    // console.log(value);
    if (!uid) return;
    getFullThink(uid).then((res) => {
      if (!res) return;
      setWishes({ ...res });
    });
    // getWishList(uid)
    //   .then((res) => {
    //     console.log(res);
    //     setWishes({ ...res?.list });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="w-full">
      Список желаний
      {isOpenNewWish && <WishForm uid={uid} change={addNewWish} />}
      {uid ? (
        <>
          {wishes ? (
            <>
              {Object.values(wishes)
                .reverse()
                .map((item: any, index: number) => {
                  return (
                    <WishItem
                      key={index}
                      id={item.id}
                      price={item.price}
                      name={item.name}
                      comment={item.comment}
                      link={item.link}
                      isOwner={isOwner}
                      change={addNewWish}
                    ></WishItem>
                  );
                })}
            </>
          ) : (
            <p>no wishes</p>
          )}
        </>
      ) : (
        <p>no uid</p>
      )}
    </div>
  );
};

export default WishList;

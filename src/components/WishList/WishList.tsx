import { getWishList } from "@/services/Firebase";
import { userState } from "@/store/usres";
import { useEffect, useState } from "react";
import WishItem from "./WishItem/WishItem";
import WishForm from "./WishForm/WishForm";
import { wishState } from "@/store/wishList";
import getFullThink from "@/utils/thinks";
import { usePathname } from "next/navigation";
import ErrorBoundary from "../alert/ErrorBoundary";

type WishListProps = {
  isOwner: boolean;
};

const WishList: React.FC<WishListProps> = ({ isOwner }) => {
  const ownerUid = userState((state) => state.user);
  const wishListId = userState((state) => state.wishListId);
  const [wishes, setWishes] = useState<{}>({});
  const isOpenNewWish = wishState((state) => state.isNewWish);
  const updatewishListId = userState((state) => state.updatewishListId);
  const pathname = usePathname();

  useEffect(() => {
    if (!ownerUid) return;
    if (pathname !== "/product") {
      updatewishListId(undefined);
    }
    if (isOwner) {
      getFullThink(ownerUid).then((res) => {
        if (!res) return;
        setWishes({ ...res });
      });
      return;
    } else if (wishListId) {
      console.log(wishListId);
      getFullThink(wishListId).then((res) => {
        if (!res) return;
        setWishes({ ...res });
      });
    }
  }, [wishListId, ownerUid]);

  // getWishList(uid)
  //   .then((res) => {
  //     setWishes({ ...res?.list });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const addNewWish = () => {
    if (!ownerUid) return;
    getFullThink(ownerUid).then((res) => {
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
    <div className="">
      {isOpenNewWish && <WishForm uid={ownerUid} change={addNewWish} />}
      {!isOwner && !wishListId ? (
        <div>
          <p className="my-5">Выбери друзьяшечку, чтобы посмотреть его лист</p>
        </div>
      ) : !isOwner && wishListId && Object.keys(wishes).length === 0 ? (
        <div>
          <p className="my-5">
            У твоего друзьяшки ещё нет желаний. Давай же попросим заполнить
            желания!
          </p>
          <button>Запрос желаний</button>
        </div>
      ) : isOwner && Object.keys(wishes).length === 0 ? (
        <p className="my-5">У тебя ещё нет ни одного желания</p>
      ) : (
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
      )}
      {/* {ownerUid ? (
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
        <div>dsfds</div>
      )} */}
    </div>
  );
};

export default WishList;

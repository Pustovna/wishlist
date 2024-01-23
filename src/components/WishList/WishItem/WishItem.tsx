import { deleteThing, getThink } from "@/services/Firebase";
import { use, useEffect, useState } from "react";
import "../style.css";
import { userState } from "@/store/usres";

type WishItemProps = {
  id: string;
  price: number;
  comment: string;
  name: string;
  link: string;
  isOwner: boolean;
  change: () => void;
};

const WishItem: React.FC<WishItemProps> = ({
  id,
  price,
  name,
  comment,
  link,
  isOwner,
  change
}) => {
  const ownerUid = userState((state) => state.user);
  const deleteItem: any = (idOfItem: string)  =>  {
    deleteThing(ownerUid, idOfItem).then((res) => {
      change();
    });
  }

  return (
    <div className="w-full my-3 box">
      <div>
        <span className="text-stone-700">Название подарочка</span>
        <p>{name}</p>
      </div>
      <div>
        <span className="text-stone-700">Цена подарочка</span>
        <p>{price}</p>
      </div>
      <div>
        <span className="text-stone-700">Ссылка на подарочек</span>
        <p>{link}</p>
      </div>
      <div>
        <span className="text-stone-700">Комментарий к подарочку</span>
        <p>{comment}</p>
      </div>
      {isOwner && (
        <button className="rounded-xl bg-teal-200 text-black px-5 py-2 hover:bg-sky-700 active:bg-sky-600"
        onClick={() => deleteItem(id)}
        >
          удалить
        </button>
      )}
    </div>
  );
};

export default WishItem;

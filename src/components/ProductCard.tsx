"use client";

import {
  GiAnt,
  GiBeerStein,
  GiBastet,
  GiBadGnome,
  GiBathtub,
  GiCoffeeBeans,
  GiBed,
  GiDoctorFace,
} from "react-icons/gi";
import User from "@/interfaces/Users";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { userState } from "@/store/usres";
import { addFriends, sendRequestToUser } from "@/services/Firebase";

// type ProductCartProps = {
//   id: number;
//   name: string;
//   price: number;
// };
const typeOfIcon = [
  GiAnt,
  GiBastet,
  GiBadGnome,
  GiBathtub,
  GiCoffeeBeans,
  GiBed,
  GiDoctorFace,
];

const getNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type ProductCardProps = {
  status: "friend" | "waiting" | "not friend";
  UserName: string | null;
  uid: string;
};

export default function ProductCard({
  UserName,
  uid,
  status,
}: ProductCardProps) {
  // const { add: handleAddToCart } = useCartStore();
  const userIcon = typeOfIcon[getNumber(0, 6)];
  const DynamicComponent = React.createElement(userIcon, {
    className: "w-[20px] h-[20px] m-3 rounded object-cover ",
  });
  const updatewishListId = userState((state) => state.updatewishListId);
  const wishListId = userState((state) => state.wishListId);
  const ownerUid = userState((state) => state.user);
  const [currentStatus, setcurrentStatus] = useState(status);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  const handleClick = () => {
    updatewishListId(uid);
  };

  const requestFriend = (id: string) => {
    if (ownerUid && id) {
      addFriends(ownerUid, id).then((res) => {
        setcurrentStatus("waiting");
        sendRequestToUser(ownerUid, id);
      });
    }
  };

  return (
    <div
      className={`shadow-xl flex items-center border p-3 rounded-xl ${
        wishListId === uid ? "border-slate-400" : "border-slate-700"
      }`}
    >
      <div className=" rounded-md">{loaded && DynamicComponent}</div>
      <div>
        <h2 className="text-slate-400">{UserName}</h2>
        {currentStatus === "friend" ? (
          <button onClick={handleClick}>Open</button>
        ) : currentStatus === "waiting" ? (
          <div>Waiting...</div>
        ) : (
          <button onClick={() => requestFriend(uid)}>Добавить в друзья</button>
        )}
      </div>

      {/* <h2 className="font-semibold text-green-400">$ {formatNumber(price)}</h2> */}
      {/* <button
        // onClick={handleAddToCart}
        className="mt-4 font-semibold text-sm bg-slate-100 text-slate-800 rounded-md py-2 text-center w-full"
      >
        Add To Cart
      </button> */}
    </div>
  );
}

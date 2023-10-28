"use client";

import { formatNumber } from "@/utils/format";
import { GiAnt, GiBeerStein, GiBastet, GiBadGnome, GiBathtub,GiCoffeeBeans, GiBed, GiDoctorFace } from "react-icons/gi";
import User from "@/interfaces/Users";
import React, { useEffect, useState } from "react";


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
  GiDoctorFace
];

const getNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ProductCard({ displayName }: User) {
  // const { add: handleAddToCart } = useCartStore();
  const userIcon = typeOfIcon[getNumber(0, 6)];
  const DynamicComponent =  React.createElement(userIcon, { className: "w-[20px] h-[20px] m-3 rounded object-cover "} );

  const [loaded, setLoaded] = useState(false);
  useEffect(() =>  setLoaded(true), []);
  


  return (
    <div className=" shadow-xl flex items-center border p-3 rounded-xl border-slate-700">
      <div className=" rounded-md">
        { loaded && DynamicComponent}
        
        {/* <img
          src="https://i0.wp.com/researchista.com/wp-content/uploads/2016/07/sdfsfds.png?fit=1200%2C800&ssl=1"
          alt="coffee"
          className="w-[180px] h-[180px] rounded object-cover"
        /> */}
      </div>
      <h2 className="text-slate-400">{displayName}</h2>
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

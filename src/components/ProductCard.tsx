'use client'


import { formatNumber } from "@/utils/format";
import { useCartStore } from "@/store/zustand";


type ProductCartProps = {
  id: number,
  name: string
  price: number,
}

export default function ProductCard({
  id, name, price
}: ProductCartProps) {
  const {add: handleAddToCart} = useCartStore();

  return (
    <div className="border p-3 rounded-xl border-slate-700">
      <div className="bg-gray-300 rounded-md mb-2">
        <img src="https://i0.wp.com/researchista.com/wp-content/uploads/2016/07/sdfsfds.png?fit=1200%2C800&ssl=1" alt="coffee" className="w-[180px] h-[180px] rounded object-cover" />
      </div>
      <h2 className="text-slate-400">{name}</h2>
      <h2 className="font-semibold text-green-400">$ {formatNumber(price)}</h2>
      <button onClick={handleAddToCart} className="mt-4 font-semibold text-sm bg-slate-100 text-slate-800 rounded-md py-2 text-center w-full">
        Add To Cart
      </button>
    </div>
  )
}
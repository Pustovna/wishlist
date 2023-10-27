import ProductCard from "@/components/ProductCard";
import { authModalState } from "@/store/auth";
import User from "@/interfaces/Users";

// export type Product = {
//   id: number,
//   displayName: string,
//   price: number
// }

export default function Page() {
  const products: User[] = [
    {
      displayName: "Kate",
      uid: "1"
    },
    {
      displayName: "King Anna",
      uid: "2"
    },
    {
      displayName: "Simple Yarik",
      uid: "3"
    },
    {
      displayName: "Kate",
      uid: "4"
    },
    {
      displayName: "King Anna",
      uid: "5"
    },
    {
      displayName: "Simple Yarik",
      uid: "6"
    },
    {
      displayName: "Kate",
      uid: "7"
    },
    {
      displayName: "King Anna",
      uid: "8"
    },
    {
      displayName: "Simple Yarik",
      uid: "9"
    },
    {
      displayName: "Kate",
      uid: "10"
    },
    {
      displayName: "King Anna",
      uid: "11"
    },
    {
      displayName: "Simple Yarik",
      uid: "12"
    }
  ];

  return (<>
    <h1 className="font-semibold text-slate-200 text-2xl border-b pb-4 border-b-slate-700">Products</h1>

    <div className="overflow-y-auto h-[80vh] w-[40%] bg-blue-950 p-5">

    
    <div className=" text-sm pt-4 flex flex-col  gap-4 ">
      {products.map(product => 
        <ProductCard 
          key={product.uid} 
          // id={product.id} 
          displayName={product.displayName} 
          // price={product.price}
          />
      )}
    </div>
    </div>
  </>)
}
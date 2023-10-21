// import Link from "next/link";

// export default function Navbar() {
//   return <nav>
   
//       <Link href="/">
//         <div className="uppercase font-bold">Learn<span className="text-teal-500">Thing</span></div>
//       </Link>

//   </nav>
// }
import Link from "next/link";
import LinkMenu from "./link/Menu";
import CartButton from "./Buttons/CartButton";

export default function Navbar() {
  return <nav>
    <div className="mx-auto max-w-6xl flex justify-between items-center text-sm text-slate-100 py-4">
      <Link href="/">
        <div className="uppercase font-bold">Learn<span className="text-teal-500">Thing</span></div>
      </Link>

      <div className="flex gap-2">
        <LinkMenu href="/product" label="Product" isNew/>
      </div>

      <div className="flex gap-1 items-center">
        <CartButton/>
      </div>
    </div>
  </nav>
}
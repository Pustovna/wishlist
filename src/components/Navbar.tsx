import Link from "next/link";
import LinkMenu from "./link/Menu";
import CartButton from "./Buttons/CartButton";
import Topbar from "./Topbar/Topbar";

export default function Navbar() {
  return <nav>
    <div className="mx-auto max-w-6xl flex justify-between items-center text-sm text-slate-100 py-4">
    

      <Link href="/">
        <div className="uppercase font-bold">Wish<span className="text-teal-500">List</span></div>
      </Link>

      <div className="flex gap-2">
        <LinkMenu href="/product" label="Product" isNew/>
      </div>

      {/* <div className="flex gap-1 items-center">
        <CartButton/>
      </div> */}
      <Topbar  />
      
    </div>
  </nav>
}
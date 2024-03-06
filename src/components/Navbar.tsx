import Link from "next/link";
import LinkMenu from "./link/Menu";
import Topbar from "./Topbar/Topbar";

export default function Navbar() {
  return (
    <nav>
      <div className="flex justify-between text-sm py-4 px-4 border-b-2 border-gray-800">
        <Link href="/">
          <div className="uppercase font-bold">
            Wish<span className="text-teal-500">List</span>
          </div>
        </Link>

        {/* <div className="flex gap-2">
        <LinkMenu href="/product" label="Product" isNew/>
      </div> */}

        <Topbar />
      </div>
    </nav>
  );
}

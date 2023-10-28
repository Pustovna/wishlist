import Link from "next/link";

export default function Home() {
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/product">
          <button>Перейти к продуктам</button>
        </Link>
        <Link href="/wishlist">
          <button>Перейти к wishlist</button>
        </Link>
      
    </main>
    </>
  )
}

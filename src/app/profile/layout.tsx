export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="text-center my-5 text-2xl text-orange-300">Мои хотелки</div>
      <div className="grow">{children}</div>
    </div>
  );
}

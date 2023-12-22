import { deleteThing, getThink } from "@/services/Firebase";
import { use, useEffect, useState } from "react";
import "../style.css";

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
  // const [loading, setLoading] = useState(true);
  // const [item, setItem] = useState<
  //   { name: string; link: string; picture: string } | undefined
  // >(undefined);

  // useEffect(() => {
  //   if (!id) {
  //     setLoading(false);
  //     return;
  //   }
  //   getThink(id)
  //     .then((res) => {
  //       setItem({
  //         name: res?.name,
  //         link: res?.link,
  //         picture: res?.picture,
  //       });
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [loading]);

  // if (loading) {
  //   return (
  //     <div role="status" className="max-w-sm animate-pulse">
  //       <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
  //       <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
  //       <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
  //       {/* <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
  //       <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
  //       <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
  //       <span className="sr-only">Loading...</span> */}
  //     </div>
  //   );
  // }
  // console.log(
  //   id + ' ' +  price + ' ' + name +  ' ' + comment  +  ' ' +  link  +  ' ' + isOwner  +  ' '
  // )

  const deleteItem: any = (idOfItem: string)  =>  {
    deleteThing("RjcT2KZ01EWGluDZ6TZMtqSimh02", idOfItem).then((res) => {
      change();
    });
  }

  return (
    <div className="w-full my-3 box">
      <div>
        <span className="text-stone-700">Имя</span>
        <p>{name}</p>
      </div>
      <div>
        <span className="text-stone-700">Прайс</span>
        <p>{price}</p>
      </div>
      <div>
        <span className="text-stone-700">Ссылка</span>
        <p>{link}</p>
      </div>
      <div>
        <span className="text-stone-700">Комментарий</span>
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

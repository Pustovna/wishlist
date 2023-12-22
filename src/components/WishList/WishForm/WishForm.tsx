import { addThing, getWishList } from "@/services/Firebase";
import { wishState } from "@/store/wishList";
import { useState } from "react";
import "../style.css";

type WishFormProps = {
  uid: string | undefined;
  change: () => void;
};

const styleText =
  "text-black py-2 px-3 rounded-lg border-2 border-sky-500 w-full";

export default function WishFom({ uid, change }: WishFormProps) {
  const [inputs, setInputs] = useState({
    name: "",
    link: "",
    price: "",
    picture: "",
    comment: "",
    createdAt: "",
  });
  const changeIsNewWish = wishState((state) => state.changeIsNewWish);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uid === undefined) return console.log("no uid");
    try {
       addThing(
        {
          name: inputs.name,
          link: inputs.link,
          picture: inputs.picture,
          price: inputs.price,
          comment: inputs.comment,
          createdAt: new Date().toISOString(),
        },
        uid
      ).then((res) => {
          change();
      });
      setInputs({
        name: "",
        link: "",
        price: "",
        comment: "",
        picture: "",
        createdAt: new Date().toISOString(),
      });
      changeIsNewWish(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box w-full my-3 p-6">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="thingName">Название</label>
        <input
          onChange={handleChangeInput}
          className={styleText}
          type="text"
          name="name"
          id="thingName"
          value={inputs.name}
        />
        <label htmlFor="thingLink">Ссылка</label>
        <input
          onChange={handleChangeInput}
          className={styleText}
          type="text"
          name="link"
          id="thingLink"
          value={inputs.link}
        />
        <label htmlFor="price">Прайс</label>
        <input
          onChange={handleChangeInput}
          className={styleText}
          type="text"
          name="price"
          id="price"
          value={inputs.price}
        />
        <label htmlFor="thingComment">Комментарий</label>
        <input
          onChange={handleChangeInput}
          className={styleText}
          type="text"
          name="comment"
          id="thingComment"
          value={inputs.comment}
        />
        <div>
          <button
            className="w-1/4 my-3 rounded-xl bg-teal-200 text-black px-5 py-2 hover:bg-sky-700 active:bg-sky-600"
            type="submit"
          >
            Добавить
          </button>
          <button
            className="w-1/4 my-3 rounded-xl bg-teal-200 text-black px-5 py-2 hover:bg-sky-700 active:bg-sky-600 ml-2"
            type="submit"
            onClick={() => changeIsNewWish(false)}
          >
            Закрыть
          </button>
        </div>
      </form>
    </div>
  );
}

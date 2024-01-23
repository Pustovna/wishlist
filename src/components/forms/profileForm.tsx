import { updateData, addFriends } from "@/services/Firebase";
import { userState } from "@/store/usres";
import { useState } from "react";
import FriendsModal from "../Modals/FriendsModal";

interface ProfileFormProps {
  uid: string;
  type: string;
  func: (param: string) => void;
}

export default function ProfileForm({ uid, type, func }: ProfileFormProps) {
  const [inputs, setInputs] = useState({});
  const updateChangedData = userState((state) => state.updateChangedData);

  const handleChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (type === "friends") {
        console.log('shalom');
        
      }
      if (type === "displayName") {
        await updateData(uid, inputs);
      }
      updateChangedData(inputs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {type === "friends" && (
        <>
          <div>
            <FriendsModal close={() => func("friends")}/>
          </div>
        </>
      )}

      {type === "displayName" && (
        <form
          onSubmit={handleChanges}
          className="gap-5 justify-center flex w-200 max-h-10"
        >
          <label className="hidden" htmlFor={type}>
            Имя
          </label>
          <input
            onChange={handleChangeInput}
            type="text"
            name={type}
            id={type}
            className="
                  border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  bg-gray-600 text-white bg-gray-600 border-gray-500 placeholder-gray-400"
          />

          <button
            type="submit"
            className="text-black font-medium rounded-lg text-sm px-5 ring ring-gray-300 hover:ring-gray-500 py-2.5 text-center bg-gray-300 hover:bg-gray-400"
          >
            ok
          </button>
        </form>
      )}
    </>
  );
}

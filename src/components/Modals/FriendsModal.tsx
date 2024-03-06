import "./friendsModal.css";
import { IoClose } from "react-icons/io5";
import { userState } from "@/store/usres";
import { addFriends, sendRequestToUser } from "@/services/Firebase";
import { useEffect, useState } from "react";
import { fullList } from "@/services/userList";

interface FriendsModalProps {
  close: (param: string, arr: null) => void;
}

export const revalidate = 3600; // for cashe

type FriendsItemProps = {
  status: "friend" | "waiting" | "not friend";
  UserName: string | null;
  uid: string;
};

export default function FriendsModal({ close }: FriendsModalProps) {
  const [allUsers, setallUsers] = useState<FriendsItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const uid = userState((state) => state.user);

  useEffect(() => {
    const usersData = async () => {
      setLoading(true);
      if (!uid) return;
      try {
        const res = await fullList(uid);
        setallUsers(res);
      } catch (error) {
        console.log("Ошибка при загрузке данных пользователей:", error);
      } finally {
        setLoading(false);
      }
    };
    usersData();
  }, []);

  const friendListUsers = input ? allUsers.filter((item) => item.UserName?.toLowerCase().includes(input.toLowerCase())) : allUsers

  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        onClick={() => close("friends", null)}
      ></div>

      <div className="w-full sm:w-[700px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                title="Закрыть"
                type="button"
                className="rounded-lg text-sm p-1.5 ml-auto inline-flex items-center bg-gray-800 hover:bg-gray-600 hover:text-white text-white"
                onClick={() => close("friends", null)}
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>
            <div className="decoration-slate-50 text-gray-800 text-center">
              <h3 className="text-xl font-medium mb-4">
                Новые друзьяшки? Новые друзьяшки!
              </h3>
              <label className="relative block mx-4">
                <span className="sr-only">Найди же друзьяшку</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    className="h-5 w-5 fill-slate-300"
                    viewBox="0 0 20 20"
                  ></svg>
                </span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-teal-400 focus:ring-teal-400 focus:ring-1 sm:text-sm"
                  placeholder="Найди же друзьяшку"
                  type="text"
                  name="search"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </label>
              <div className="friends-container max-h-96 my-4 px-4 overflow-auto">
                {loading ? (
                  <Load />
                ) : (
                  friendListUsers.map((item) => {

                    return (
                      <div key={item.uid}>
                        <FriendsItem
                          status={item.status}
                          UserName={item.UserName}
                          uid={item.uid}
                        ></FriendsItem>
                      </div>
                    );
                   
                   
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const FriendsItem: React.FC<FriendsItemProps> = ({ status, UserName, uid }) => {
  const [icon, setIcon] = useState<String>(status);
  const uidOwner = userState((state) => state.user);
  const deleteFriend = () => {
    console.log("delete");
  };

  const addFriend = () => {
    if (uidOwner && uid) {
      addFriends(uidOwner, uid).then((res) => {
        setIcon("waiting");
        sendRequestToUser(uidOwner, uid);
      });
    }
  };

  return (
    <div className="flex justify-between my-5">
      <p className="break-all mr-4 text-left">{UserName}</p>

      {icon === "friend" && (
        <button
          title="Удалить друга"
          className="button-user button-delete py-2.5"
          onClick={deleteFriend}
        ></button>
      )}
      {icon === "waiting" && (
        <span className="button-user button-waiting py-2.5 pointer-events-none"></span>
      )}

      {icon === "not friend" && (
        <button
          title="Добавить друга"
          className="button-user button-add py-2.5"
          onClick={addFriend}
        ></button>
      )}
    </div>
  );
};

const Load = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

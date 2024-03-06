import { useState } from "react";
import ProfileForm from "@/components/forms/profileForm";

export default function  NameField({
    id,
    style,
    userName,
  }: {
    id: string;
    style: string;
    userName: string;
  }) {
    const [changeUserInfo, setchangeUserInfo] = useState<String>("");
    const [name, setName] = useState<String>(userName);
  
    const handleOpenChanges = (sorse: string, newName: any = null) => {
      if (changeUserInfo === sorse) {
        setchangeUserInfo("");
        if (newName) {
          setName(newName);
        }
        return;
      }
      setchangeUserInfo(sorse);
    };
  
    return (
      <div className="">
        <div className="flex flex-col w-100">
          <div className="flex min-w-52">
            <span className="mr-2">Имя</span>
            <span className={style}>{name}</span>
          </div>
          {changeUserInfo === "displayName" ? (
            <>
              <ProfileForm
                uid={id}
                type="displayName"
                func={(sorse, input) => handleOpenChanges(sorse, input)}
              ></ProfileForm>
              <button
                onClick={() => handleOpenChanges("displayName")}
                className="m-3"
              >
                Закрыть
              </button>
            </>
          ) : (
            <button
              onClick={() => handleOpenChanges("displayName")}
              className="mx-3"
            >
              Изменить
            </button>
          )}
        </div>
      </div>
    );
  }
  
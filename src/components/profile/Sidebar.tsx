import { fetchUserData } from "@/services/userData";
import NameField from "@/components/profile/NameField";
import FriendsList from "@/components/profile/FriendsList";
import RequestList from "@/components/profile/RequestList";

export default async function SideBarWrapper({ uid }: { uid: string }) {
  const { name, userEmail, requestList, waitingList, friendsList } =
    await fetchUserData(uid);
  const styleText = "text-red-300";

  return (
    <>
      <NameField id={uid} style={styleText} userName={name}></NameField>
      <FriendsList uid={uid} friendsList={friendsList}></FriendsList>
      <RequestList uid={uid} requestList={requestList}></RequestList>
    </>
  );
}


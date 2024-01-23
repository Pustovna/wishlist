import User from '@/interfaces/Users';
import { getUserName } from '@/services/Firebase';
import { get } from 'http';
import { create } from 'zustand';


type UserState = {
    user: string | undefined; // which user's wish list should be displayed
    wishListId: string | undefined ;
    friendsList: Object[];
    friendsRequestList: String[]; 
    friendsWaitingList: [];
    changedData: object | undefined, // buffer for changed data that should be updated in firestore
}

type UserActions = {
    updateUser: (user: string | undefined) => void;
    updatefriendsList: (friendsList: []) => void;
    updatefriendsRequestList: (friendsRequestList: []) => void;
    updatefriendsWaitingList: (friendsWaitingList: []) => void;
    updateChangedData: (changedData: object | undefined) => void;
    deleteFriends: (id: string) => void;
    deleteFromRequests: (id: string) => void;
    addFriends: (id: string) => void;
    updatewishListId: (id: string) => void;
}

export const userState = create<UserState & UserActions>((set, get) => ({
    friendsList: [],
    friendsRequestList: [],
    friendsWaitingList: [],
    user: undefined,
    changedData: undefined,
    wishListId: undefined, // номер виш-листа, который нужно открыть в списке друзей. Сбрасывается, если страница !== /product
    updateUser: (user) => set({ user }),
    updatewishListId: (wishListId) => set({ wishListId }),
    updatefriendsList: (friendsList) => set({friendsList}),
    updatefriendsRequestList: (friendsRequestList) => set({ friendsRequestList }),
    updatefriendsWaitingList: (friendsWaitingList) => set({friendsWaitingList}),
    updateChangedData: (changedData) => set({ changedData }),
    deleteFriends: (id) => {
        const newUserArr: Object[] = get().friendsList.filter((item: any) => item.id !== id);
        set({ friendsList: newUserArr});
    },
    addFriends: async (id) => {
        const newFriend: Object = {
            id: id, 
            displayName: await getUserName(id)
        }
        const arr: Object[] = get().friendsList;
        const updateArr: Object[] = [...arr,  newFriend];
        set({ friendsList: updateArr});
    },
    deleteFromRequests: (id) => {
        const newUserArr: String[] = get().friendsRequestList.filter((item: any) => item !== id);
        set({ friendsRequestList: newUserArr});
    }
}));

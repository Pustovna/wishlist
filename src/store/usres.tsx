import User from '@/interfaces/Users';
import { get } from 'http';
import { create } from 'zustand';

type UserState = {
    user: string | undefined; // which user's wish list should be displayed
    changedData: object | undefined, // buffer for changed data that should be updated in firestore
}

type UserActions = {
    updateUser: (user: string | undefined) => void;
    updateChangedData: (changedData: object | undefined) => void;
}

export const userState = create<UserState & UserActions>((set) => ({
    user: undefined,
    changedData: undefined,
    updateUser: (user) => set({ user }),
    updateChangedData: (changedData) => set({ changedData }),
}));

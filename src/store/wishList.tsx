import { create } from 'zustand';

type WishState = {
    isNewWish: boolean;
}

type WishActions = {
    changeIsNewWish: (isNewWish: boolean) => void;
}

export const wishState = create<WishState & WishActions>((set) => ({
    isNewWish: false,
    wasUpgrade: false,
    changeIsNewWish: (isNewWish) => set(() => ({isNewWish})),
}));

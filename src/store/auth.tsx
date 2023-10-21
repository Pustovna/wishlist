
import {create} from 'zustand';

type AuthModalState = {
   isOpen: boolean,
   type: 'login' | 'signup' 
}

type AuthModalActions = {
    updateType: (type: AuthModalState['type']) => void
    updateAll: (updates: Partial<AuthModalState>) => void
    updateIsOpen: (isOpen: boolean) => void
}


export const authModalState = create<AuthModalState & AuthModalActions>((set) => ({
    isOpen: false, 
    type: 'login',
    updateType: (type) => set(() => ({type})),
    updateAll: (updates) => set((state) => ({...state, ...updates})),
    updateIsOpen: (isOpen) => set(() => ({isOpen}))
}));
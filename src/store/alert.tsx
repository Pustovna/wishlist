import { create } from 'zustand';

type AlertState = {
    isAlert: boolean,
 }
 
 type AlertActions = {
    changeAlertState: (isAlert: boolean) => void
 }
 
 
 export const AlertState = create<AlertState & AlertActions>((set) => ({
    isAlert: false, 
    changeAlertState: (isAlert) => set(() => ({isAlert})),
 }));
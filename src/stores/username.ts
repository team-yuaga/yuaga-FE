import { create } from "zustand";

interface UserNameState {
    userName: string;
    setUserName: (name: string) => void;
}

const useUserName = create<UserNameState>((set) => ({
    userName: "",
    setUserName: (name) => set({ userName: name }),
}));

export default useUserName;
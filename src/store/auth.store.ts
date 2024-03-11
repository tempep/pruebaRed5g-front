import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";




export interface AuthState {
    isAuthenticated: boolean;

    changeStateAuthentication: (state: boolean) => void;
}


const storeApi: StateCreator<AuthState> = (set, get) => ({

    isAuthenticated: false,

    changeStateAuthentication: (state: boolean) => {
        console.log(state);
        set({ isAuthenticated: state });
        console.log(get().isAuthenticated);
    }

});

export const useAuthStore = create<AuthState>()(
    devtools(
        storeApi
    )
);

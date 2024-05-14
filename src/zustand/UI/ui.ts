import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UI {
  sidebarHide: boolean;
  sidebarWidth: any;
  creator: string;
  loading: boolean;
  setSidebarHide: () => void;
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
  setSidebar: ({ width }: { width: any }) => void;
}

export const useUiStore = create<UI>()(
  devtools(
    persist(
      (set) => ({
        sidebarHide: false,
        creator: "Aqsha Permana",
        loading: false,
        sidebarWidth: 0,
        setSidebarHide: () => {
          set((state) => ({
            ...state,
            sidebarHide: !state.sidebarHide,
          }));
        },
        setSidebar: ({ width }: { width: any }) => {
          set((state) => ({
            ...state,
            sidebarWidth: width,
          }));
        },
        setLoadingTrue: () => {
          set((state) => ({
            ...state,
            loading: true,
          }));
        },
        setLoadingFalse: () => {
          set((state) => ({
            ...state,
            loading: false,
          }));
        },
      }),
      {
        name: "ui",
      }
    ),
    {
      name: "ui",
      features: {
        dispatch: true,
        jump: true,
        pause: true,
        persist: true,
        skip: true,
      },
      enabled: true,
    }
  )
);

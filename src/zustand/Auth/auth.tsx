import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Auth {
  uuid: string;
  email: string;
  role: string;
  initialRoute: string;
  name: string;
  sub: string;
  setAuth: ({
    email,
    initialRoute,
    name,
    uuid,
  }: {
    uuid: string;
    email: string;
    name: string;
    initialRoute?: string;
  }) => void;
  setRole: ({
    role,
    initialRoute,
  }: {
    role: string;
    initialRoute?: string;
  }) => void;
  setInitialPage: ({ initialRoute }: { initialRoute: string }) => void;
  setSubAuth: ({ value }: { value: string }) => void;
}

export const useAuthStore = create<Auth>()(
  devtools(
    persist(
      (set) => ({
        uuid: "",
        email: "",
        role: "",
        name: "",
        initialRoute: "/",
        sub: "",
        setAuth: ({
          email,
          initialRoute,
          name,
          uuid,
        }: {
          uuid: string;
          email: string;
          name: string;
          initialRoute?: string;
        }) => {
          set((state) => ({
            ...state,
            email: email,
            name: name,
            uuid: uuid,
            initialRoute: initialRoute ?? state.initialRoute,
          }));
        },
        setRole: ({
          role,
          initialRoute,
        }: {
          role: string;
          initialRoute?: string;
        }) => {
          set((state) => ({
            ...state,
            role: role,
            initialRoute: initialRoute ?? state.initialRoute,
          }));
        },
        setInitialPage: ({ initialRoute }: { initialRoute: string }) => {
          set((state) => ({
            ...state,
            initialRoute: initialRoute,
          }));
        },
        setSubAuth: ({ value }: { value: string }) => {
          set((state) => ({
            ...state,
            sub: value,
          }));
        },
      }),
      {
        name: "auth",
      }
    ),
    {
      name: "auth",
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

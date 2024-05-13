import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Auth {
  email: string;
  role: string;
  initialRoute: string;
  permissions: string[];
  name: string;
  sub: string;
  setAuth: ({
    email,
    initialRoute,
    name,
  }: {
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
        email: "",
        role: "",
        name: "",
        initialRoute: "/",
        permissions: [],
        sub: "",
        setAuth: ({
          email,
          initialRoute,
          name,
        }: {
          email: string;
          name: string;
          initialRoute?: string;
        }) => {
          set((state) => ({
            ...state,
            email: email,
            name: name,
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

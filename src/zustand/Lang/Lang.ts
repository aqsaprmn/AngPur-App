import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Lang {
  currentLang: {
    lang: string;
    label: string;
  };
  supportedLang: {
    lang: string;
    label: string;
  }[];
  setCurrentLang: ({
    payload,
  }: {
    payload: {
      lang: string;
      label: string;
    };
  }) => void;
}

export const useLangStore = create<Lang>()(
  devtools(
    persist(
      (set) => ({
        currentLang: {
          lang: "id",
          label: "Indonesia",
        },
        supportedLang: [
          {
            lang: "en",
            label: "English",
          },
          {
            lang: "id",
            label: "Indonesia",
          },
        ],
        setCurrentLang: ({
          payload,
        }: {
          payload: {
            lang: string;
            label: string;
          };
        }) => {
          set((state) => ({
            ...state,
            currentLang: payload,
          }));
        },
      }),
      {
        name: "language",
      }
    ),
    {
      name: "language",
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

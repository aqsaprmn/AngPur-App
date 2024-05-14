import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Cart {
  cart: {
    product: {
      uuid: string;
      name: string;
      price: string;
      image: string;
      description: string;
      total: number;
      check: boolean;
      note: string;
    };
  }[];
  totalProduct: number;
  setCart: ({
    cart,
  }: {
    cart: {
      product: {
        uuid: string;
        name: string;
        price: string;
        image: string;
        description: string;
        total: number;
        check: boolean;
        note: string;
      };
    }[];
  }) => void;
  setTotalProduct: ({ totalProduct }: { totalProduct: number }) => void;
}

export const useCartStore = create<Cart>()(
  devtools(
    persist(
      (set) => ({
        cart: [],
        totalProduct: 0,
        setCart: ({
          cart,
        }: {
          cart: {
            product: {
              uuid: string;
              name: string;
              price: string;
              image: string;
              description: string;
              total: number;
              check: boolean;
              note: string;
            };
          }[];
        }) => {
          set((state) => ({
            ...state,
            cart: cart as {
              product: {
                uuid: string;
                name: string;
                price: string;
                image: string;
                description: string;
                total: number;
                check: boolean;
                note: string;
              };
            }[],
          }));
        },
        setTotalProduct: ({ totalProduct }: { totalProduct: number }) => {
          set((state) => ({
            ...state,
            totalProduct: totalProduct,
          }));
        },
      }),
      {
        name: "cart",
      }
    ),
    {
      name: "cart",
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

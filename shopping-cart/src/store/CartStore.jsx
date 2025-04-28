import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set) => ({
            cart: [], // 상태
            setCart: (newCart) => set({ cart: newCart }),
        }),
        {
            name: "cart-storage", // localStorage에 저장되는 이름
            getStorage: () => localStorage, // 기본 저장소 사용
        }
    )
);

export const useHydratedCart = () => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // 상태가 hydrated (복원) 되면 isHydrated를 true로 설정
        const unsubscribe = useCartStore.subscribe(
            (state) => {
                if (state.cart) {
                    setIsHydrated(true); // 상태 복원이 완료되면 isHydrated를 true로 설정
                }
            },
            (state) => state.cart
        );

        return () => unsubscribe(); // 구독 해제
    }, []);

    return isHydrated;
};

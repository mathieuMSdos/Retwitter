// index.store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createFormSlice, StepFormSlice } from "./form.slice";

// ------------ TYPAGE ------------
// Combinaison des slices
type Store = StepFormSlice; // Ajoute d'autres slices ici si besoin

export const useStore = create<Store>()(
  devtools(
    persist(
      (...args) => ({
        ...createFormSlice(...args),
      }),
      {
        name: "main-store",
      }
    )
  )
);

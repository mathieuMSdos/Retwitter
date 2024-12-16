// form.slice.ts

import { StateCreator } from "zustand";

// ------------Typage de la slice ------------
export interface StepFormSlice {
  step: number;
  setNextStep: () => void;
  setPreviousStep: () => void;
}

// state pour gérer les étapes d'avancement du formulaire

export const createFormSlice: StateCreator<StepFormSlice> = (set) => ({
  step: 1,
  setNextStep: () => set((state) => ({ step: state.step + 1 })),
  setPreviousStep: () =>
    set((state) => ({ step: Math.max(0, state.step - 1) })),
});

// state pour stocker les réponses à chaque étapes

// export const formDataSlice = (set) => ({
//   newUsername: "",
//   newDisplayName:"",
//   setFormData: ()=> set((state) =>)
// })
"use client";

import { useStore } from "@/lib/store/index.store";
import { useState } from "react";

const OnBoardingStep1 = () => {
  // zustand state
  const setNextStep = useStore((state) => state.setNextStep);

  // const state local
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep();
  };
  return (
    <div>
      <h1>step 1</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
          required
        />
        <button>Next</button>
      </form>
    </div>
  );
};

export default OnBoardingStep1;

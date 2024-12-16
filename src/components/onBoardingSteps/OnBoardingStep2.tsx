"use client";

import { useStore } from "@/lib/store/index.store";
import { useState } from "react";

const OnBoardingStep2 = () => {
  // zustand state
  const setPreviousStep = useStore((state) => state.setPreviousStep);

  // const state local
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // créer un server action qui va les envoyé à la BDD via prisma
  };
  return (
    <div>
      <h1>step 2</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
          required
        />
        <div>
          <button onClick={setPreviousStep}>Previous</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default OnBoardingStep2;

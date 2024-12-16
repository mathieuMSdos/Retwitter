"use client"
import { useStore } from "@/lib/store/index.store";
import OnBoardingStep1 from "./OnBoardingStep1";
import OnBoardingStep2 from "./OnBoardingStep2";

const OnBoardingFormMulti = () => {

// ZUSTAND state
const step = useStore((state) => state.step)

  return (
    
    <div className="bg-red-600">
            {step === 1 && <OnBoardingStep1 />}
            {step === 2 && <OnBoardingStep2 />}
    </div>
  );
};

export default OnBoardingFormMulti;
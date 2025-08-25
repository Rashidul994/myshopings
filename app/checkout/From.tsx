'use client'

import { useState } from "react";
import AddressStep from "./steps/AddressStep";
import PaymentStep from "./steps/PaymentStep";
import ConfirmStep from "./steps/ConfirmStep";
import { AnimatePresence, motion } from "framer-motion";

export default function StepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: "",
    payment: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <div>
      <div className="flex justify-between mb-6">
        {["ঠিকানা", "পেমেন্ট", "নিশ্চিতকরণ"].map((label, i) => (
          <div key={i} className={`flex-1 text-center py-2 rounded-md font-medium text-sm ${step === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>
            {label}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <AddressStep
              data={formData}
              setData={setFormData}
              onNext={next}
            />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <PaymentStep
              data={formData}
              setData={setFormData}
              onNext={next}
              onBack={prev}
            />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            <ConfirmStep data={formData} onBack={prev} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

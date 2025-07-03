import React, { useState, useEffect } from "react";

const shoeTypes = [
  { name: "Rubber Shoes", image: "/images/rubbershoes.jpg" },
  { name: "Leather", image: "/images/leather.jpg" },
  { name: "Canvas", image: "/images/canvas.jpg" },
  { name: "Sneakers", image: "/images/sneakers.jpg" },
  { name: "Heels", image: "/images/heels.jpg" },
];

const services = [
  { id: 1, name: "Basic Clean", price: "₱150" },
  { id: 2, name: "Deep Clean", price: "₱200" },
  { id: 3, name: "Clean + Repaint", price: "₱250" },
  { id: 4, name: "Deodorize Only", price: "₱100" },
];

const paymentMethods = ["GCash", "Card", "Cash"];

const simulationSteps = [
  "Please insert your shoe into the kiosk...",
  "Shoe detected.",
  "Cleaning in progress",
  "Cleaning complete! ✅",
];

export default function ShoeCleaningVendingMachine() {
  const [step, setStep] = useState(1);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentStepMsg, setCurrentStepMsg] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    if (confirmed && stepIndex < simulationSteps.length) {
      const timeout = setTimeout(() => {
        setCurrentStepMsg(simulationSteps[stepIndex]);
        setStepIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timeout);
    }

    if (confirmed && stepIndex === simulationSteps.length && !printing) {
      const printTimeout = setTimeout(() => {
        setPrinting(true);
        setCurrentStepMsg("Printing receipt...");
      }, 2000);
      return () => clearTimeout(printTimeout);
    }

    if (printing) {
      const resetTimeout = setTimeout(() => {
        resetAll();
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [stepIndex, confirmed, printing]);

  const resetAll = () => {
    setStep(1);
    setConfirmed(false);
    setSelectedShoe(null);
    setSelectedService(null);
    setSelectedPayment(null);
    setCurrentStepMsg(null);
    setStepIndex(0);
    setPrinting(false);
  };

  return (
    <div className="bg-white text-gray-800 w-[700px] h-[650px] rounded-xl shadow-xl overflow-hidden border-2 border-gray-300 flex flex-col">
      <div className="bg-blue-100 p-4 text-center font-bold text-lg text-blue-800 border-b border-blue-300">
        Shoe Cleaning Vending Machine
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {step === 1 && (
          <>
            <h2 className="text-md font-semibold mb-4">Step 1: Select Shoe Type</h2>
            <div className="space-y-3">
              {shoeTypes.map((shoe) => (
                <button
                  key={shoe.name}
                  className={`flex items-center gap-3 w-full py-2 px-3 rounded border ${
                    selectedShoe === shoe.name
                      ? "bg-yellow-200 border-yellow-400"
                      : "bg-white hover:bg-gray-50 border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedShoe(shoe.name);
                    setStep(2);
                  }}
                >
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-12 h-12 object-contain bg-gray-100 rounded"
                  />
                  <span>{shoe.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-md font-semibold mb-4">Step 2: Select Cleaning Service</h2>
            <div className="space-y-3">
              {services.map((svc) => (
                <button
                  key={svc.id}
                  className={`w-full py-2 px-3 rounded text-left font-medium border ${
                    selectedService?.id === svc.id
                      ? "bg-yellow-200 border-yellow-400"
                      : "bg-white hover:bg-gray-50 border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedService(svc);
                    setStep(3);
                  }}
                >
                  <div>{svc.name}</div>
                  <div className="text-sm text-gray-500">{svc.price}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Back
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-md font-semibold mb-4">Step 3: Select Payment Method</h2>
            <div className="flex gap-4 justify-center">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  className={`px-4 py-2 rounded font-medium border ${
                    selectedPayment === method
                      ? "bg-yellow-200 border-yellow-400"
                      : "bg-white hover:bg-gray-50 border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedPayment(method);
                    setStep(4);
                    setConfirmed(true);
                    setCurrentStepMsg(simulationSteps[0]);
                    setStepIndex(1);
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Back
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <p
              className={`text-blue-700 text-md text-center font-medium ${
                currentStepMsg?.includes("progress") ? "typing-dots" : ""
              }`}
            >
              {currentStepMsg}
            </p>
            <div className="flex justify-center mt-4">

            </div>
          </>
        )}
      </div>
    </div>
  );
}

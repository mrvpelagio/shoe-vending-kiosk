import React, { useState, useEffect } from "react";

const shoeTypes = [
  { name: "Rubber Shoes", image: "/images/rubbershoes.jpg" },
  { name: "Leather", image: "/images/leather.jpg" },
  { name: "Canvas", image: "/images/canvas.jpg" },
  { name: "Sneakers", image: "/images/sneakers.jpg" },
  { name: "Heels", image: "/images/heels.jpg" },
  
];

const paymentMethods = ["GCash", "Card", "Cash"];


const services = [
  { id: 1, name: "Basic Clean", price: "₱150" },
  { id: 2, name: "Deep Clean", price: "₱200" },
  { id: 3, name: "Clean + Repaint", price: "₱250" },
  { id: 4, name: "Deodorize Only", price: "₱100" },
];

const simulationSteps = [
  "Please insert your shoe into the kiosk...",
  "Shoe detected.",
  "Cleaning in progress",
  "Cleaning complete! ✅",
];

export default function ShoeCleaningVendingMachine() {
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);



  const isReady = selectedShoe && selectedService && selectedPayment;


  useEffect(() => {
    if (confirmed && stepIndex < simulationSteps.length) {
      const timeout = setTimeout(() => {
        setCurrentStep(simulationSteps[stepIndex]);
        setStepIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [stepIndex, confirmed]);

  const startSimulation = () => {
    setConfirmed(true);
    setCurrentStep(simulationSteps[0]);
    setStepIndex(1);
  };

  const reset = () => {
    setConfirmed(false);
    setCurrentStep(null);
    setStepIndex(0);
    setSelectedShoe(null);
    setSelectedService(null);
    setSelectedPayment(null);
  };




  return (
    <div className="bg-gray-900 text-white w-[700px] rounded-xl shadow-2xl overflow-hidden border-4 border-blue-300">
      <div className="bg-blue-600 p-4 text-center font-bold text-lg">
        Shoe Cleaning Vending Machine
      </div>

      {/* Shoe Type + Service Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Shoe Type Selector */}
        <div>
          <h2 className="text-md font-semibold mb-2">Select Shoe Type</h2>
          <div className="space-y-2">
            {shoeTypes.map((shoe) => (
              <button
                key={shoe.name}
                className={`flex items-center gap-3 w-full py-2 px-3 rounded border ${
                  selectedShoe === shoe.name
                    ? "bg-yellow-300 text-black border-yellow-400"
                    : "bg-gray-800 hover:bg-gray-700 border-gray-600"
                }`}
                onClick={() => {
                  setSelectedShoe(shoe.name);
                  setConfirmed(false);
                }}
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-12 h-12 object-contain rounded bg-white"
                />
                <span>{shoe.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Service Selector */}
        <div>
          <h2 className="text-md font-semibold mb-2">Select Cleaning Service</h2>
          <div className="space-y-2">
            {services.map((svc) => (
              <button
                key={svc.id}
                className={`w-full py-2 px-3 rounded text-left font-medium border ${
                  selectedService?.id === svc.id
                    ? "bg-yellow-300 text-black border-yellow-400"
                    : "bg-gray-800 hover:bg-gray-700 border-gray-600"
                }`}
                onClick={() => {
                  setSelectedService(svc);
                  setConfirmed(false);
                }}
              >
                <div>{svc.name}</div>
                <div className="text-sm text-gray-300">{svc.price}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="px-4 pb-2">
        <h2 className="text-md font-semibold mb-2">Select Payment Method</h2>
        <div className="flex gap-3 justify-center">
          {paymentMethods.map((method) => (
            <button
              key={method}
              className={`px-4 py-2 rounded font-medium border ${
                selectedPayment === method
                  ? "bg-yellow-300 text-black border-yellow-400"
                  : "bg-gray-800 hover:bg-gray-700 border-gray-600 text-white"
              }`}
              onClick={() => {
                setSelectedPayment(method);
                setConfirmed(false);
              }}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Summary + Simulation */}
      <div className="bg-gray-800 p-4 border-t border-gray-700 text-center">
        {!confirmed ? (
          <>
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            {isReady ? (
              <>
                <p>
                  <span className="text-gray-300">Shoe:</span>{" "}
                  <strong>{selectedShoe}</strong>
                </p>
                <p>
                  <span className="text-gray-300">Service:</span>{" "}
                  <strong>{selectedService.name}</strong> (
                  <span className="text-yellow-300">{selectedService.price}</span>)
                </p>
                <p>
                  <span className="text-gray-300">Payment:</span>{" "}
                  <strong>{selectedPayment || "None"}</strong>
                </p>
              </>
            ) : (
              <p className="text-gray-400 italic">
                Please select both a shoe type and service
              </p>
            )}

            <button
              disabled={!isReady}
              onClick={startSimulation}
              className={`mt-4 px-6 py-2 rounded font-bold ${
                isReady
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              Start Cleaning
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">Machine Status</h2>
            <p
              className={`text-yellow-300 text-md ${
                currentStep.includes("progress") ? "typing-dots" : ""
              }`}
            >
              {currentStep}
            </p>

            {stepIndex > simulationSteps.length - 1 && (
              <button
                onClick={reset}
                className="mt-4 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
              >
                Start New Order
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

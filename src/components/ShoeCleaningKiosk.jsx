import React, { useState, useEffect } from "react";

const shoeTypes = [
  { name: "Rubber Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center" },
  { name: "Leather", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&h=200&fit=crop&crop=center" },
  { name: "Canvas", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&h=200&fit=crop&crop=center" },
  { name: "Heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop&crop=center" },
];

const services = [
  { id: 1, name: "Basic Clean", price: 150 },
  { id: 2, name: "Deep Clean", price: 200 },
  { id: 3, name: "Clean + Repaint", price: 250 },
  { id: 4, name: "Deodorize Only", price: 100 },
  { id: 5, name: "Drying Only", price: 80 },
  { id: 6, name: "Custom Preset", price: 150 },
];

const customPresetOptions = {
  wash: [
    { time: "5 mins", price: 0 },
    { time: "6 mins", price: 10 },
    { time: "7 mins", price: 20 },
    { time: "8 mins", price: 30 },
  ],
  soap: [
    { name: "Basic", price: 0 },
    { name: "Brand 1", price: 15 },
    { name: "Brand 2", price: 20 },
  ],
  rinse: [
    { times: "1 time", price: 0 },
    { times: "2 times", price: 10 },
    { times: "3 times", price: 20 },
  ],
  dry: [
    { time: "2 mins", price: 0 },
    { time: "3 mins", price: 10 },
    { time: "4 mins", price: 20 },
    { time: "5 mins", price: 30 },
  ],
  uv: [
    { time: "4 mins", price: 25 },
    { time: "5 mins", price: 35 },
    { time: "6 mins", price: 45 },
  ],
};

const paymentMethods = ["GCash", "Card", "Cash"];

const simulationSteps = [
  "Please insert your shoe into the kiosk...",
  "Shoe detected.",
  "Cleaning in progress...",
  "Cleaning complete! ✅",
];

export default function ShoeCleaningVendingMachine() {
  const [step, setStep] = useState(1);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [addDeodorizer, setAddDeodorizer] = useState(false);
  const [currentStepMsg, setCurrentStepMsg] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [greenTip, setGreenTip] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [customPreset, setCustomPreset] = useState({
    wash: null,
    soap: null,
    rinse: null,
    dry: null,
    uv: null
  });
  const [customPresetStep, setCustomPresetStep] = useState(1);

  const greenTips = [
    "🌱 Each cleaning saves ~1L of water vs hand washing!",
    "💨 Our dryers use 30% less power than traditional methods.",
    "♻️ Our system filters and recycles cleaning agents.",
    "🚫 Say goodbye to moldy, wet shoes!",
    "👟 Proper cleaning extends shoe life by 40%!",
  ];

  useEffect(() => {
    if (confirmed && stepIndex < simulationSteps.length) {
      const timeout = setTimeout(() => {
        setCurrentStepMsg(simulationSteps[stepIndex]);
        setStepIndex((prev) => prev + 1);

        if (!showTip && step === 4) {
          const randomTip = greenTips[Math.floor(Math.random() * greenTips.length)];
          setGreenTip(randomTip);
          setShowTip(true);
          setTimeout(() => setShowTip(false), 4000);
        }
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
  }, [stepIndex, confirmed, printing, step]);

  const resetAll = () => {
    setStep(1);
    setConfirmed(false);
    setSelectedShoe(null);
    setSelectedService(null);
    setSelectedPayment(null);
    setAddDeodorizer(false);
    setCurrentStepMsg(null);
    setStepIndex(0);
    setPrinting(false);
    setGreenTip(null);
    setShowTip(false);
    setCustomPreset({
      wash: null,
      soap: null,
      rinse: null,
      dry: null,
      uv: null
    });
    setCustomPresetStep(1);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white h-[650px] w-[700px] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <h1 className="text-xl font-bold mb-1">Hello there.</h1>
          <p className="text-blue-100 text-xs">Let's bring your shoes back to life.</p>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">1. Select your shoe type.</h2>
                <p className="text-gray-600 text-xs">Choose the type that best matches your shoes</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {shoeTypes.map((shoe) => (
                  <button
                    key={shoe.name}
                    onClick={() => {
                      setSelectedShoe(shoe.name);
                      setStep(2);
                    }}
                    className={`relative bg-white border-2 rounded-xl p-3 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedShoe === shoe.name 
                        ? "border-blue-500 shadow-lg ring-2 ring-blue-100" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="h-24 mb-2 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                      <img 
                        src={shoe.image} 
                        alt={shoe.name} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-800">{shoe.name}</p>
                  </button>
                ))}
              </div>
              
              <div className="pt-2">
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl text-sm"
                  onClick={() => {
                    const delay = 1500;
                    const randomIndex = Math.floor(Math.random() * shoeTypes.length);
                    const detectedShoe = shoeTypes[randomIndex].name;
                    setCurrentStepMsg("Detecting shoe type...");
                    setTimeout(() => {
                      setSelectedShoe(detectedShoe);
                      setStep(2);
                      setCurrentStepMsg(null);
                    }, delay);
                  }}
                >
                  Auto Detect Shoe Type
                </button>
                {currentStepMsg && (
                  <div className="mt-3 text-center">
                    <div className="inline-flex items-center space-x-2 text-blue-600">
                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent"></div>
                      <span className="text-xs font-medium">{currentStepMsg}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">2. Select a cleaning service.</h2>
                <p className="text-gray-600 text-xs">Choose your preferred cleaning level</p>
              </div>
              
              <div className="space-y-2">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    className={`w-full p-3 rounded-lg text-left border-2 transition-all duration-300 ${
                      selectedService?.id === svc.id
                        ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-100"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => {
                      setSelectedService(svc);
                      // Skip deodorizer step for services that already include deodorizing or drying only
                      if (svc.id === 4 || svc.id === 5) {
                        setStep(4); // Skip to payment
                      } else if (svc.id === 6) {
                        setStep(2.5); // Go to custom preset configuration
                      } else {
                        setStep(3); // Go to deodorizer add-on
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{svc.name}</h3>
                        <p className="text-xs text-gray-600">Professional cleaning service</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-blue-600">₱{svc.price}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
              >
                ← Back
              </button>
            </div>
          )}

          {step === 2.5 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Custom Preset Configuration</h2>
                <p className="text-gray-600 text-xs">Customize your cleaning experience</p>
              </div>
              
              {/* Step 1: Wash Time */}
              {customPresetStep === 1 && (
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">Step 1: Wash Time (Required)</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {customPresetOptions.wash.map((option, index) => (
                        <button
                          key={index}
                          className={`p-2 rounded-lg border-2 transition-all duration-300 ${
                            customPreset.wash === option
                              ? "border-blue-500 bg-blue-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                          onClick={() => setCustomPreset({...customPreset, wash: option})}
                        >
                          <div className="text-xs">
                            <div className="font-medium">{option.time}</div>
                            <div className="text-blue-600">{option.price > 0 ? `+₱${option.price}` : 'Free'}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCustomPresetStep(2)}
                      disabled={!customPreset.wash}
                      className={`flex-1 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm ${
                        customPreset.wash
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Soap Type */}
              {customPresetStep === 2 && (
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">Step 2: Soap Type (Required)</h3>
                    <div className="space-y-2">
                      {customPresetOptions.soap.map((option, index) => (
                        <button
                          key={index}
                          className={`w-full p-2 rounded-lg border-2 transition-all duration-300 ${
                            customPreset.soap === option
                              ? "border-green-500 bg-green-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                          onClick={() => setCustomPreset({...customPreset, soap: option})}
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium">{option.name}</span>
                            <span className="text-green-600">{option.price > 0 ? `+₱${option.price}` : 'Free'}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCustomPresetStep(1)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCustomPresetStep(3)}
                      disabled={!customPreset.soap}
                      className={`flex-1 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm ${
                        customPreset.soap
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Rinse Cycles */}
              {customPresetStep === 3 && (
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">Step 3: Rinse Cycles (Required)</h3>
                    <div className="space-y-2">
                      {customPresetOptions.rinse.map((option, index) => (
                        <button
                          key={index}
                          className={`w-full p-2 rounded-lg border-2 transition-all duration-300 ${
                            customPreset.rinse === option
                              ? "border-purple-500 bg-purple-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                          onClick={() => setCustomPreset({...customPreset, rinse: option})}
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium">{option.times}</span>
                            <span className="text-purple-600">{option.price > 0 ? `+₱${option.price}` : 'Free'}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCustomPresetStep(2)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCustomPresetStep(4)}
                      disabled={!customPreset.rinse}
                      className={`flex-1 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm ${
                        customPreset.rinse
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 4: Dry Time */}
              {customPresetStep === 4 && (
                <div className="space-y-3">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">Step 4: Dry Time (Required)</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {customPresetOptions.dry.map((option, index) => (
                        <button
                          key={index}
                          className={`p-2 rounded-lg border-2 transition-all duration-300 ${
                            customPreset.dry === option
                              ? "border-orange-500 bg-orange-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                          onClick={() => setCustomPreset({...customPreset, dry: option})}
                        >
                          <div className="text-xs">
                            <div className="font-medium">{option.time}</div>
                            <div className="text-orange-600">{option.price > 0 ? `+₱${option.price}` : 'Free'}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCustomPresetStep(3)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCustomPresetStep(5)}
                      disabled={!customPreset.dry}
                      className={`flex-1 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm ${
                        customPreset.dry
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 5: UV Treatment (Optional) */}
              {customPresetStep === 5 && (
                <div className="space-y-3">
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">Step 5: UV Treatment (Optional)</h3>
                    <p className="text-xs text-gray-600 mb-3">UV treatment provides additional sanitization</p>
                    
                    <div className="mb-3">
                      <button
                        className={`w-full p-2 rounded-lg border-2 transition-all duration-300 mb-2 ${
                          customPreset.uv === null
                            ? "border-gray-400 bg-gray-50 shadow-lg"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        onClick={() => setCustomPreset({...customPreset, uv: null})}
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium">Skip UV Treatment</span>
                          <span className="text-gray-600">Free</span>
                        </div>
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {customPresetOptions.uv.map((option, index) => (
                        <button
                          key={index}
                          className={`w-full p-2 rounded-lg border-2 transition-all duration-300 ${
                            customPreset.uv === option
                              ? "border-indigo-500 bg-indigo-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                          onClick={() => setCustomPreset({...customPreset, uv: option})}
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium">UV {option.time}</span>
                            <span className="text-indigo-600">+₱{option.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCustomPresetStep(4)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">3. Add deodorizer?</h2>
                <p className="text-gray-600 text-xs">Fresh scent for your clean shoes</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Deodorizer Add-On</h3>
                    <p className="text-xs text-gray-600">Eliminates odors and adds fresh scent</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">₱30</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                      addDeodorizer
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setAddDeodorizer(true)}
                  >
                    Yes, add it
                  </button>
                  <button
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                      !addDeodorizer
                        ? "bg-gray-500 text-white shadow-lg"
                        : "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setAddDeodorizer(false)}
                  >
                    No, skip
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(selectedService?.id === 6 ? 2.5 : 2)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">4. Select payment method.</h2>
                <p className="text-gray-600 text-xs">Choose how you'd like to pay</p>
              </div>
              
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method}
                    className={`w-full p-3 rounded-lg border-2 transition-all duration-300 ${
                      selectedPayment === method
                        ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-100"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => {
                      setSelectedPayment(method);
                      setStep(5);
                      setConfirmed(true);
                      setCurrentStepMsg(simulationSteps[0]);
                      setStepIndex(1);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800 text-sm">{method}</span>
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">→</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setStep(selectedService?.id === 4 || selectedService?.id === 5 ? 2 : 3)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
              >
                ← Back
              </button>
            </div>
          )}
          {step === 5 && (
            <div className="text-center space-y-4 relative">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                </div>
                <p className="text-blue-700 text-sm font-medium">
                  {currentStepMsg}
                </p>
              </div>
              
              {showTip && greenTip && (
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg shadow-lg animate-pulse">
                  <p className="text-green-800 text-xs font-medium">{greenTip}</p>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Order Summary</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Shoe Type:</span>
                    <span className="font-medium">{selectedShoe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  {addDeodorizer && (
                    <div className="flex justify-between">
                      <span>Deodorizer:</span>
                      <span className="font-medium">₱30</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Payment:</span>
                    <span className="font-medium">{selectedPayment}</span>
                  </div>
                  <div className="border-t pt-1 flex justify-between font-bold text-blue-600">
                    <span>Total:</span>
                    <span>₱{selectedService?.price + (addDeodorizer ? 30 : 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
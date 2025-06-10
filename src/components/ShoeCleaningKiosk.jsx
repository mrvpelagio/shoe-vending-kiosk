import React, { useState } from "react";

const shoeTypes = ["Sneakers", "Leather", "Suede", "Heels"];
const cleanTypes = [
  { name: "Basic Clean", time: 5, price: 100 },
  { name: "Deep Clean", time: 10, price: 180 },
  { name: "Deodorize", time: 3, price: 50 },
  { name: "Water-repellent", time: 7, price: 120 }
];
const paymentOptions = ["GCash", "Credit Card", "Pay on Pickup"];

export default function ShoeCleaningKiosk() {
  const [shoeType, setShoeType] = useState(null);
  const [cleanType, setCleanType] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isCleaning, setIsCleaning] = useState(false);

  const startCleaning = () => {
    if (!shoeType || !cleanType || !paymentMethod) {
      alert("Please select shoe type, cleaning type, and payment method.");
      return;
    }
    setIsCleaning(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 10;
      setProgress(count);
      if (count >= 100) {
        clearInterval(interval);
        alert("Cleaning complete! Please retrieve your shoe.");
        setProgress(0);
        setIsCleaning(false);
        setPaymentMethod(null);
        setCleanType(null);
        setShoeType(null);
      }
    }, cleanType.time * 10);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          👟 Shoe Cleaning Kiosk
        </h1>

        {/* Shoe Type Selection */}
        <div>
          <h2 className="font-semibold mb-2">1. Select Shoe Type</h2>
          <div className="flex flex-wrap gap-2">
            {shoeTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setShoeType(type);
                  setCleanType(null);
                  setPaymentMethod(null);
                }}
                className={`px-4 py-2 rounded border ${
                  shoeType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Cleaning Type Selection */}
        <div>
          <h2 className="font-semibold mb-2">2. Choose Cleaning Type</h2>
          <div className="flex flex-wrap gap-2">
            {cleanTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => {
                  if (shoeType) setCleanType(type);
                }}
                disabled={!shoeType}
                className={`px-4 py-2 rounded border transition ${
                  !shoeType
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : cleanType?.name === type.name
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-green-100"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
          {!shoeType && (
            <p className="text-xs text-gray-500 mt-2">
              Select a shoe type first to unlock cleaning options.
            </p>
          )}
        </div>

        {/* Summary & Payment Options */}
        {shoeType && cleanType && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-md border text-sm space-y-1">
              <p><strong>Shoe:</strong> {shoeType}</p>
              <p><strong>Cleaning:</strong> {cleanType.name}</p>
              <p><strong>Time:</strong> {cleanType.time} min</p>
              <p><strong>Price:</strong> ₱{cleanType.price}</p>
            </div>

            <div>
              <h2 className="font-semibold mb-2">3. Choose Payment Method</h2>
              <div className="flex flex-wrap gap-2">
                {paymentOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setPaymentMethod(option)}
                    className={`px-4 py-2 rounded border ${
                      paymentMethod === option
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 hover:bg-purple-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={startCleaning}
          disabled={isCleaning || !paymentMethod}
          className={`w-full py-3 rounded text-white font-bold transition ${
            isCleaning || !paymentMethod
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {isCleaning ? "Cleaning..." : "Insert Shoe & Start"}
        </button>

        {/* Progress Bar */}
        {isCleaning && (
          <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
            <div
              className="bg-blue-600 h-4 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

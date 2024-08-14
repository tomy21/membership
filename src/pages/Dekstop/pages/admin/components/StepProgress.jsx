import React from "react";

export default function StepProgress({ step }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-400">
      <div
        className={`flex-1 text-center ${
          step >= 1 ? "text-indigo-600" : "text-gray-400"
        }`}
      >
        <div className="flex justify-center items-center mb-2">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              step >= 1 ? "border-indigo-600 bg-indigo-100" : "border-gray-400"
            }`}
          >
            {step > 1 ? (
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <span className="font-bold text-indigo-600">01</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm">Input Product</p>
        </div>
      </div>

      <div
        className={`flex-1 text-center py-4 ${
          step >= 2 ? "text-indigo-600" : "text-gray-400"
        }`}
      >
        <div className="flex justify-center items-center mb-2">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              step >= 2 ? "border-indigo-600 bg-indigo-100" : "border-gray-400"
            }`}
          >
            {step > 2 ? (
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <span className="font-bold text-indigo-600">02</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm">Input Duration</p>
        </div>
      </div>

      <div
        className={`flex-1 text-center py-4 ${
          step >= 3 ? "text-indigo-600" : "text-gray-400"
        }`}
      >
        <div className="flex justify-center items-center mb-2">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              step >= 3 ? "border-indigo-600 bg-indigo-100" : "border-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                step >= 3
                  ? "border-indigo-600 bg-indigo-100"
                  : "border-gray-400"
              }`}
            >
              {step > 3 ? (
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="font-bold text-indigo-600">03</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm">Input Product Amount</p>
        </div>
      </div>
    </div>
  );
}

import React, { useRef } from "react";

function PinInput() {
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="my-4">
      <div className="text-center mb-2">Masukan PIN</div>
      <div className="flex justify-center space-x-2">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <input
              key={index}
              type="password"
              maxLength="1"
              className="w-12 h-12 border border-gray-300 rounded text-center text-xl"
              autoFocus={index === 0}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              inputMode="numeric"
            />
          ))}
      </div>
    </div>
  );
}

export default PinInput;

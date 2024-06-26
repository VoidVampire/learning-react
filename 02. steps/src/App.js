import { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Earn money"];

export default function App() {
  // dont set state manually
  const [step, setStep] = useState(1);
  const [isOpen, setisOpen] = useState(true);
  // use callback function for updating state
  function handlePrevious() {
    step > 1 && setStep((s) => s - 1);
  }
  function handleNext() {
    step < 3 && setStep((s) => s + 1);
  }
  return (
    // react fragment
    <>
      <button
        className="close"
        onClick={() => {
          setisOpen((is) => !is);
        }}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {/* we dont need template literal here because we are not producing an additional string */}
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}{" "}
          </p>
          <div className="buttons">
            <Button
              bgcolor="#7950f2"
              txtcolor="#fff"
              onClickEvent={handlePrevious}
            >
              <span>👈</span>Previous
            </Button>
            <Button bgcolor="#7950f2" txtcolor="#fff" onClickEvent={handleNext}>
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ bgcolor, txtcolor, onClickEvent, children }) {
  // learning children prop
  return (
    <button
      style={{ backgroundColor: bgcolor, color: txtcolor }}
      onClick={onClickEvent}
    >
      {children}
    </button>
  );
}

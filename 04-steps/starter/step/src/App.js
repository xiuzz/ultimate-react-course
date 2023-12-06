import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setOpen] = useState(true);

  function handlePrevious() {
    if (step >= 2)
      setStep((st) => st-1);
  }
  
  function handleNext() { 
    if (step <= 2) 
      setStep((st) => st+1);
  }

  function handleOpen() {
    setOpen((op) => !op)  
  }

  return ( 
    <> 
      <button 
        className="close" 
        onClick={handleOpen}
      >
        &times;
      </button>
      {isOpen && <div className="steps"> 
        <div className="numbers">
          <div className={`${step >= 1? "active" : ""}`}>1</div>
          <div className={`${step >= 2? "active" : ""}`}>2</div>
          <div className={`${step >= 3? "active" : ""}`}>3</div>
        </div>
        
        <p className="message">Step{step}:{messages[step-1]}</p>
        
        <div className="buttons">
          <Button handleEvent={handlePrevious} backgroundColor="#7950f2" color="#fff">
          👈 Previous 
          </Button>
          <Button handleEvent={handleNext} text="next" backgroundColor="#7950f2" color="#fff">
          Next 👉
          </Button>
        </div>
      </div>
      }
    </>
  )
}

function Button({handleEvent, children, backgroundColor, color}) {
  return(
      <button 
        style={{backgroundColor:backgroundColor, color:color}} 
        onClick={handleEvent}
      >
        {children}
      </button>
  )
}
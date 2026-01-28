import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@material-tailwind/react";

function App() {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log("la pagina e' stata caricata");
  }, []);
  useEffect(() => {
    console.log("counter eà cambiato");
  }, [counter]);
  return (
    <>
      <div>Counter: </div>
      {counter}
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        cliccami
      </button>
    </>
  );
}

export default App;

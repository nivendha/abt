import { useState, useRef, useMemo } from "react";
import Dummy from "./components/Dummy";
import "./App.css";

const SAMPLE_DATA = `
111111111
111110111
111110011
111110111
111111001
111110101
111110101
`;

function* readData(rawData: string) {
  rawData = rawData.replaceAll("\n", "");
  let start = 0;
  while (start < rawData.length) {
    let data = rawData.substring(start, start + 8);
    start += 9;
    yield data;
  }
  return null;
}

function App() {
  const [inputData, setInputData] = useState<string>("");
  const [rawData, setRawData] = useState<string>(SAMPLE_DATA);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const readItr = useMemo(() => readData(rawData), [rawData]);
  const stackContainer = useRef<HTMLDivElement>(null);
  const addToStackDisplay = (value: string) => {
    const pElement = document.createElement("p");
    pElement.innerText = value;
    stackContainer.current?.appendChild(pElement);
  };
  const loadAuto = () => {
    if (isComplete) return;
    let autoTimer = setInterval(() => {
      if (isComplete) {
        clearInterval(autoTimer);
      } else {
        load();
      }
    }, 1000);
  };

  const load = () => {
    if (isComplete) return;
    let currentFrame = readItr.next();
    if (!currentFrame.done) {
      setInputData(currentFrame.value);
      addToStackDisplay(currentFrame.value);
    } else {
      setIsComplete(true);
    }
  };
  return (
    <div className="app flex h-screen bg-gray-100">
      {/* Left pane */}
      <div className="flex-1 w-1/3">
        {/* inputData:{inputData} */}
        <h4 className="text-2xl text-center">ATD MARKERS</h4>
        <Dummy bitString={inputData} isComplete={isComplete} />
        {isComplete ? (
          <h4 className="text-2xl text-center">COMPLETED</h4>
        ) : null}
      </div>
      <div className="flex-1 w-1/3">
        <h4 className="text-2xl text-center">Stack Area</h4>
        <div className=" stack " ref={stackContainer}></div>
      </div>
      {/* Right pane */}
      <div className="flex-1 w-1/3">
        <div className="inpurtArea ">
          <h4 className="text-2xl text-center mb-4">Input data</h4>
          <textarea
            id="story"
            rows={10}
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
          ></textarea>
        </div>
        {/* Toolbar */}
        <div className="toolBar">
          <button onClick={() => loadAuto()} className="bg-blue-500 text-white">
            Load stack Automatic
          </button>
          <button
            className="runBtn bg-blue-500 text-white"
            onClick={() => load()}
          >
            Load stack
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

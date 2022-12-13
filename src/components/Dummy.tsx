import Marker from "./Marker";
import { useId } from "react";
const Dummy: React.FC<{ bitString: string; isComplete: boolean }> = ({
  bitString,
  isComplete,
}) => {
  if (bitString.length == 0) return <></>;
  return (
    <div className="marker flex">
      {Array(8)
        .fill("0")
        .map((__, index) => (
          <Marker
            key={index}
            dataBit={bitString[index]}
            isComplete={isComplete}
            label={(index + 1).toString()}
          />
        ))}
      {/*       
      <Marker dataBit={bitString[1]} isComplete={isComplete} label={"2"} />
      <Marker dataBit={bitString[2]} isComplete={isComplete} label={"3"} />
      <Marker dataBit={bitString[3]} isComplete={isComplete} label={"4"} />
      <Marker dataBit={bitString[4]} isComplete={isComplete} label={"5"} />
      <Marker dataBit={bitString[5]} isComplete={isComplete} label={"6"} />
      <Marker dataBit={bitString[6]} isComplete={isComplete} label={"7"} />
      <Marker dataBit={bitString[7]} isComplete={isComplete} label={"8"} />
      <Marker dataBit={bitString[8]} isComplete={isComplete} label={"9"} /> */}
    </div>
  );
};

export default Dummy;

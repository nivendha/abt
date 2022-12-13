import { useState, useEffect, useMemo } from "react";
export enum SIGNAL_CLR {
  OK = "GREEN",
  BROKEN = "RED",
  UNSTABLE = "YELLOW",
}
const Marker: React.FC<{
  dataBit: string;
  isComplete: boolean;
  label?: string;
}> = ({ dataBit, label = null, isComplete = false }) => {
  const [status, setStatus] = useState<SIGNAL_CLR>(SIGNAL_CLR.OK);
  let colorCode = "white";
  switch (status) {
    case SIGNAL_CLR.OK:
      colorCode = "green";
      break;
    case SIGNAL_CLR.BROKEN:
      colorCode = "red";
      break;
    case SIGNAL_CLR.UNSTABLE:
      colorCode = "yellow";
      break;
  }
  useEffect(() => {
    if (dataBit == "0") {
      setStatus(isComplete ? SIGNAL_CLR.BROKEN : SIGNAL_CLR.UNSTABLE);
    }
  }, [dataBit, isComplete]);

  return (
    <div
      style={{ backgroundColor: colorCode }}
      className={`rounded-full w-12 h-12 `}
    >
      {label}
    </div>
  );
};

export default Marker;

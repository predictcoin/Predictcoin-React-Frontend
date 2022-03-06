import { useState } from "react";
import { getCountdown } from "../../../lib/utils/time";

const useCountdown = (
  start: number,  
  end: number,
): { countdown: string, width: string } => {
  const [state, setState] = useState({countdown:"00d:00h:00m:00s", width: "0"});
  const repeat = () => {
    const now = Date.now();
    const [duration, interval] = [end-now, end-start];
    const {days, hours, minutes, seconds} = getCountdown(end-now);
    const width = `${(interval-duration)/interval*100}%`
    setState({countdown: `${days}d:${hours}h:${minutes}m:${seconds}s`, width});
  }
  
  setInterval(repeat, 2000);
  return state ;
}

export default useCountdown;
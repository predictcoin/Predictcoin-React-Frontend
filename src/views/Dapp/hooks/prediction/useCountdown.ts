import { useEffect, useState } from "react";
import { getCountdown } from "../../lib/utils/time";

const useCountdown = (
  start: number,  
  end: number,
): { countdown: string, width: string } => {
  const [state, setState] = useState({countdown:"00d:00h:00m:00s", width: "0"});
  const repeat = () => {
    const now = Date.now()/1000;
    const [duration, interval] = [end-now, end-start];                    
    const {days, hours, minutes, seconds} = getCountdown(Math.trunc(end-now));
    const width = `${Math.trunc((interval-duration)/interval*100)}%`
    setState({countdown: `${days}d:${hours}h:${minutes}m:${seconds}s`, width});
  }
  
  useEffect(() => {
    const intervalFunc = setInterval(repeat, 2000);
    return () => {
      clearInterval(intervalFunc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end])
  return state ;
}

export default useCountdown;
import axios from "axios";
import { worldTimeApiEndpoint } from "../../constants/apiEndpoints";

export const formatMatchUITime = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000);
  const WATTime = date.toLocaleTimeString("en-US", {timeZone: "Africa/Lagos"});
  const AMorPM = WATTime.split(" ")
  const HHMMDDArray = WATTime.split(" ")[0].split(":")
  if(AMorPM[1] === "PM") return `${Number(HHMMDDArray[0]) + 12}:${HHMMDDArray[1]} WAT`
  return `${HHMMDDArray[0]} : ${HHMMDDArray[1]} WAT`
}

export const formatMatchUIDate = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000);
  const localeDate = date.toLocaleDateString("en-BZ", {timeZone: "Africa/Lagos"});
  const weekDay = date.toLocaleDateString("en-BZ", {timeZone: "Africa/Lagos", weekday: "short"});
  return `${weekDay}, ${localeDate}`;
}

export const getElapsedSeconds = async (startTimestamp: number):Promise<number> => {
  const res = await axios.get(worldTimeApiEndpoint)  
  return res.data.unixtime - startTimestamp;
}
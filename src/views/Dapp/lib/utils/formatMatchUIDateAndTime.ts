import axios from "axios";
import { worldTimeApiEndpoint } from "../../constants/apiEndpoints";

const padZero = (num: number) => {
  if(num > 9)
    return num
  return `0${num}`
}

export const formatMatchUITime = (timeStamp: number) => {
  const dateObj = new Date(timeStamp * 1000);
  const UTCDate = dateObj.toUTCString()
  const time = UTCDate.split(" ")[4];
  return `${time.substring(0, 5)} UTC`;
}

export const formatMatchUIDate = (timeStamp: number) => {
  const dateObj = new Date(timeStamp * 1000);
  const dayOfWeek = dateObj.toUTCString().split(" ")[0]
  const date = dateObj.getUTCDate()
  const month = dateObj.getUTCMonth() + 1 //it start counting from 0
  const year = dateObj.getUTCFullYear()
  return `${dayOfWeek} ${padZero(date)}/${padZero(month)}/${year}`;
}

export const getElapsedSeconds = async (startTimestamp: number):Promise<number> => {
  const res = await axios.get(worldTimeApiEndpoint)  
  return res.data.unixtime - startTimestamp;
}
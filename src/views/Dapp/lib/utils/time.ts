export interface Time  {
  days: string,
  hours: string,
  minutes: string,
  seconds: string
}

export const zeroPad = (num: number) => {
    var zero = 2 - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

export const getCountdown = (duration: number): Time => {
  const [dayInSec, hourInSec, minInSec] = [60 * 60 * 24, 60 * 60, 60]
  const days = Math.trunc(duration/dayInSec);
  let remTime = duration - days * dayInSec;
  const hours = Math.trunc(remTime/hourInSec);
  remTime = remTime - hours * hourInSec;
  const mins = Math.trunc(remTime/minInSec);
  const secs = Math.trunc(remTime - mins * minInSec);

  const _days = zeroPad(days);
  const _hours = zeroPad(hours);
  const _mins = zeroPad(mins);
  const _secs = zeroPad(secs);
  return { days: _days, hours:  _hours, minutes: _mins, seconds:  _secs};
}

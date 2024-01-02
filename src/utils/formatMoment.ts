import moment from "moment";
import { mod } from "./mathUtils";

moment.locale("en-ca");

export function formatMoment(value: string, pattern = "YYYY/MM/DD HH:mm:ss") {
  return moment(+value).format(pattern);
}

export function formatUnixMoment(
  value: string,
  pattern = "YYYY/MM/DD HH:mm:ss"
) {
  return moment(+value * 1000).format(pattern);
}

// export function formatDuration(value: string, pattern = "MM/DD HH:mm:ss") {
//   const duration = moment.duration(value, "seconds");
//   const formattedDuration = moment
//     .utc(duration.asMilliseconds())
//     .format(pattern);
//   return formattedDuration;
// }

export function formatDuration(
  beginTime: string | number,
  endTime: string | number
) {
  const _moment = moment(Number(endTime));
  return `${_moment.diff(beginTime, "day")}天${mod(
    _moment.diff(beginTime, "hour"),
    24
  )}时`;
}

export function transformCountDown(props: Record<string, number>) {
  const formattedProps = {} as Record<string, string>;

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}
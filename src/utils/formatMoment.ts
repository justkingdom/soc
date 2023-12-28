import moment from "moment";

moment.locale("en-ca");

export function formatMoment(value: string, pattern = "YYYY/MM/DD HH:mm:ss") {
  return moment(+value).format(pattern);
}

export function formatUnixMoment(value: string, pattern = "YYYY/MM/DD HH:mm:ss") {
  return moment(+value * 1000).format(pattern);
}

export function formatDuration(value: string, pattern = "MM/DD HH:mm:ss") {
  const duration = moment.duration(value, "seconds");
  const formattedDuration = moment
    .utc(duration.asMilliseconds())
    .format(pattern);
  return formattedDuration;
}

import dateToObj from './dateToObj'

export default function (timestamp, second) {
  if (!timestamp) return ''
  let time = dateToObj(timestamp)
  // console.log('time', time);
  if (!second) return `${time.y}-${time.m}-${time.d}`
  return `${time.y}-${time.m}-${time.d} ${time.hh}:${time.mm}:${time.ss}`
}

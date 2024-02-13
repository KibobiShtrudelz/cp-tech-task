import { RequestsType } from '@interface'

export const getDays = (length: number) => Array.from({ length }, (_, i) => (i + 1).toString())

export const convertUnixTimestamp = (timestamp: number, type: RequestsType) => {
  const date = new Date(timestamp * 1000)
  return type === 'Day' ? date.getDate() : date.getHours()
}

export const getTimeRange = (type: RequestsType) =>
  Array.from(
    { length: type === 'Day' ? 31 : 24 },
    (_, i) =>
      `${type === 'Day' ? 'Day ' : ''}` +
      (i + 1 < 12 ? i + 1 : i + 1 - 12 === 0 ? i + 1 : i + 1 - 12).toString() +
      `${type === 'Hour' ? (i + 1 < 12 || i + 1 === 24 ? 'AM' : 'PM') : ''} `
  )

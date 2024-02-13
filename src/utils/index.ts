import { RequestsType } from '@interface'

// export const getRemainingDays = ({ from, to }: Range) => {
//   const days = +to - +from + 1
//   let daysToReturn = days

//   return (
//     daysToReturn !== 0 &&
//     Array.from({ length: days }, (_, i) => {
//       daysToReturn -= 1
//       return i + +from
//     })
//   )
// }

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
      (i + 1).toString() +
      `${type === 'Hour' ? (i + 1 < 12 || i + 1 === 24 ? 'AM' : 'PM') : ''} `
  )

import { Range } from '@interface'

export const getRemainingDays = ({ from, to }: Range) => {
  const days = +to - +from + 1
  let daysToReturn = days
  /**
   * тук има да се работи, защото като филтрирам от 1-ви до 5-ти ден, 5-я ден ми е само в warningLogs, а като
   * филтрирам от 1-ви до 31-ви 5-я ден ми е само в errorLogs
   */

  return (
    daysToReturn !== 0 &&
    Array.from({ length: days }, (_, i) => {
      daysToReturn -= 1
      return i + +from
      // return (+from + 1).toString()
    })
  )
}

export const getDays = (length: number) => Array.from({ length }, (_, i) => (i + 1).toString())

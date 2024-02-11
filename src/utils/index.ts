import { Range } from '@interface'

export const getDays = ({ from, to }: Range<'number'>) => {
  const days = to - from
  let daysToReturn = days

  return (
    daysToReturn !== 0 &&
    Array.from({ length: days }, (_, i) => {
      daysToReturn -= 1
      return (i + 1).toString()
    })
  )
}

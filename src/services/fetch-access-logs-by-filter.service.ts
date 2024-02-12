import { FormData } from '@interface'

import dummyData from './access_logs.json'

// Theis service is used to mimic data fetching from the server
// In this case, we're using the dummy data and client calculations to simulate a server response
export const fetchAccessLogsByFiltersService = (filters: FormData | undefined) => ({
  queryKey: ['accessLogs'],
  queryFn: async () => {
    // console.log('submited filters >>>', JSON.stringify(filters, null, 2))

    const successLogs: object[] = []
    const warningLogs: object[] = []
    const errorLogs: object[] = []

    if (filters) {
      // check timestamp filters
      if (filters.timestampFrom && filters.timestampTo) {
        const from = +filters.timestampFrom
        const to = +filters.timestampTo

        const testingDays: number[] = []

        // In this case the regular for loop is more performant that Array.forEach
        for (let i = 0; i < dummyData.length; i++) {
          const log = dummyData[i]
          const timestampDate = new Date(log.timestamp * 1000) // converting to milliseconds
          const timestampDay = timestampDate.getDate()

          testingDays.push(timestampDay)

          switch (log.status) {
            case 0: {
              if (timestampDay >= from && timestampDay <= to) {
                successLogs.push(log)
              }

              break
            }

            case 1: {
              if (timestampDay >= from && timestampDay <= to) {
                warningLogs.push(log)
              }

              break
            }

            case 2: {
              if (timestampDay >= from && timestampDay <= to) {
                errorLogs.push(log)
              }

              break
            }

            default: {
              break
            }
          }
        }

        console.log('testingDays', testingDays)
      }
    }

    // const timeSpan = dummyData.map(log => log.timestamp).sort((a, b) => a - b)

    // const timeRange = timeSpan.reduce(
    //   (acc, timestamp) => {
    //     acc.from = Math.min(acc.from || timestamp, timestamp)
    //     acc.to = Math.max(acc.to, timestamp)
    //     return acc
    //   },
    //   { from: Infinity, to: -Infinity }
    // )

    // const fromTimestamp = new Date(timeRange.from * 1000)
    // const toTimestamp = new Date(timeRange.to * 1000)

    console.log('successLogs', successLogs)
    return {
      // successStatuses
      // successLogs: dummyData.filter(log => log.status === 0),
      // warningLogs: dummyData.filter(log => log.status === 1),
      // errorLogs: dummyData.filter(log => log.status === 2)
      successLogs,
      warningLogs,
      errorLogs
    }
  }
  // enable: Boolean(filters)
})

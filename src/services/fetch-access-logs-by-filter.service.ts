import { FormData } from '@interface'

import dummyData from './access_logs.json'

// Theis service is used to mimic data fetching from the server
// In this case, we're using the dummy data and client calculations to simulate a server response
export const fetchAccessLogsByFiltersService = (filters: FormData | undefined) => ({
  queryKey: ['accessLogs'],
  queryFn: async () => {
    console.log('submited filters >>>', JSON.stringify(filters, null, 2))

    const successLogs: object[] = []
    const warningLogs: object[] = []
    const errorLogs: object[] = []

    if (filters) {
      // check timestamp filters
      if (filters.timestamp.from && filters.timestamp.to) {
        const from = +filters.timestamp.from
        const to = +filters.timestamp.to

        dummyData.forEach((log, i) => {
          const timestampDate = new Date(log.timestamp)
          const timestampDay = timestampDate.getDate()

          // if (i < 3) {
          //   console.log('log', log)
          //   console.log('timestampDay', timestampDay)
          // }

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
        })
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

// import {  } from '@interface'

import dummyData from './access_logs.json'

// Theis service is used to mimic data fetching from the server
// In this case, we're using the dummy data and client calculations to simulate a server response
export const fetchAccessLogsServiceByFilter = (filter: Filter | undefined) => ({
  queryKey: ['accessLogs'],
  queryFn: async () => {
    const timeSpan = dummyData.map(log => log.timestamp).sort((a, b) => a - b)

    const timeRange = timeSpan.reduce(
      (acc, timestamp) => {
        acc.from = Math.min(acc.from || timestamp, timestamp)
        acc.to = Math.max(acc.to, timestamp)
        return acc
      },
      { from: Infinity, to: -Infinity }
    )

    const fromTimestamp = new Date(timeRange.from * 1000)
    console.log('fromTimestamp', new Date(fromTimestamp))
    const toTimestamp = new Date(timeRange.to * 1000)
    console.log('toTimestamp', new Date(toTimestamp))

    return {
      // successStatuses
      successLogs: dummyData.filter(log => log.status === 0),
      warningLogs: dummyData.filter(log => log.status === 1),
      errorLogs: dummyData.filter(log => log.status === 2)
    }
  }
  // enable: Boolean(filter)
})

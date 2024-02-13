import { convertUnixTimestamp } from '@utils'
import { FetchAccessLogsByFiltersServiceProps } from '@interface'

import dummyData from './access_logs.json'

// Theis service is used to mimic data fetching from the server
// In this case, we're using the dummy data and client calculations to simulate a server response
export const fetchAccessLogsByFiltersService = (
  filters?: FetchAccessLogsByFiltersServiceProps
) => ({
  queryKey: ['accessLogs'],
  queryFn: async () => {
    const { url, status, issueType, timestampFrom, timestampTo, responseTimeFrom, responseTimeTo } =
      filters

    // const successLogs: AccessLog[] = []
    // const warningLogs: AccessLog[] = []
    // const errorLogs: AccessLog[] = []

    // if (filters) {
    //   // Filtering by timestamp and status
    //   // if (filters.timestampFrom && filters.timestampTo) {
    //     // const from = +filters.timestampFrom
    //     // const to = +filters.timestampTo
    //     // for (let i = 0; i < dummyData.length; i++) {
    //     //   const log = dummyData[i]
    //     //   const timestampDay = convertUnixTimestamp(log.timestamp, 'Day')
    //     //   switch (log.status) {
    //     //     case 0: {
    //     //       if (timestampDay >= from && timestampDay <= to) {
    //     //         successLogs.push(log as AccessLog)
    //     //       }
    //     //       break
    //     //     }
    //     //     case 1: {
    //     //       if (timestampDay >= from && timestampDay <= to) {
    //     //         warningLogs.push(log as AccessLog)
    //     //       }
    //     //       break
    //     //     }
    //     //     case 2: {
    //     //       if (timestampDay >= from && timestampDay <= to) {
    //     //         errorLogs.push(log as AccessLog)
    //     //       }
    //     //       break
    //     //     }
    //     //     default: {
    //     //       break
    //     //     }
    //     //   }
    //     // }
    //   // }

    //   // if (typeof filters.issueType.type === 'number') {
    //   //   return
    //   // }
    // }

    const filteredAccessLogsZ = dummyData
      .filter(log => {
        const from = filters?.timestampFrom && +filters?.timestampFrom
        const to = filters?.timestampTo && +filters?.timestampTo
        const timestampDay = convertUnixTimestamp(log.timestamp, 'Day')
        return (
          typeof from === 'number' &&
          typeof to === 'number' &&
          timestampDay >= from &&
          timestampDay <= to
        )
      }) // timestamp
      .filter(log => status === undefined || log.status === status) // status
      .filter(log => issueType === undefined || log.issue_type === issueType) // issueType
      .filter(log => {
        const from = +responseTimeFrom
        const to = +responseTimeTo
        return log.response_time >= from && log.response_time <= to
      }) // responseTime
      .filter(log => {
        const [path, queryString] = url.split('?')
        console.log('path', path)
        return path
      }) // url

    const filteredAccessLogs = dummyData.filter(log => {
      const from = filters?.timestampFrom && +filters?.timestampFrom
      const to = filters?.timestampTo && +filters?.timestampTo
      const timestampDay = convertUnixTimestamp(log.timestamp, 'Day')
      return (
        typeof from === 'number' &&
        typeof to === 'number' &&
        timestampDay >= from &&
        timestampDay <= to
      )
    })

    console.log('filteredAccessLogs >>>', filteredAccessLogs)
    return filteredAccessLogs
  },
  enable: Boolean(filters)
})

import { convertUnixTimestamp } from '@utils'
import { FetchAccessLogsByFiltersServiceProps } from '@interface'

import dummyData from './access_logs.json'

// This service is used to mimic data fetching from a server
// In this case, we're using the dummy data and client calculations to simulate a server response
// All of the calculations inside the service's body are meant to be done in the backend
export const fetchAccessLogsByFiltersService = (
  filters?: FetchAccessLogsByFiltersServiceProps
) => ({
  queryKey: ['accessLogs'],
  queryFn: async () => {
    // Not using destructuring intentionally for better TS support
    const url = filters?.url
    const status = filters?.status
    const issueType = filters?.issueType
    const timestampFrom = filters?.timestampFrom
    const timestampTo = filters?.timestampTo
    const responseTimeFrom = filters?.responseTimeFrom
    const responseTimeTo = filters?.responseTimeTo

    // Return the log in every filter() if filter value is undefined since no URL filter is set
    const filteredAccessLogs = dummyData
      .filter(log => {
        const from = timestampFrom ? +timestampFrom : 0
        const to = timestampTo ? +timestampTo : 0
        const timestampDay = convertUnixTimestamp(log.timestamp, 'Day')

        return timestampDay >= from && timestampDay <= to
      }) // Filtered by timestamp
      .filter(log => status === undefined || status.type === log.status) // Filtered by status
      .filter(
        log => log.status === 0 || issueType === undefined || issueType.type === log?.issue_type
      ) // Filtered by issueType
      .filter(log => url === undefined || log.url?.includes(url)) // Filtered by url
      .filter(log => {
        const from = responseTimeFrom ? +responseTimeFrom : 0
        const to = responseTimeTo ? +responseTimeTo : 0

        if (!from && !to) {
          return true
        }

        if (from && !to) {
          return log.response_time >= from
        } else if (!from && to) {
          return log.response_time <= to
        } else {
          return log.response_time >= from && log.response_time <= to
        }
      }) // Filtered by responseTime

    return filteredAccessLogs
  },
  enable: Boolean(filters)
})

import { convertUnixTimestamp } from '@utils'
import { FetchAccessLogsByFiltersServiceProps } from '@interface'

import dummyData from './access_logs.json'

// This service is used to mimic data fetching from a server
// In this case, we're using the dummy data and client calculations to simulate a server response
// All of the calculations inside the service's body are meant to be done in the backend
// No pagination is implemented intentionally because this type of calculation is expensive and it's done on the back-end! If I do it here, it would be a performance issue!
// (*) Instead, I'm using the virtual scroller to render the data in chunks and all filtering is done with only one iteration here!
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

    // (*)
    const filteredAccessLogs = dummyData.filter(log => {
      const from = timestampFrom ? +timestampFrom : 0
      const to = timestampTo ? +timestampTo : 0
      const timestampDay = convertUnixTimestamp(log.timestamp, 'Day')

      // Filtered by timestamp
      if (timestampDay >= from && timestampDay <= to) {
        // Filtered by status
        if (status === undefined || status.type === log.status) {
          // Filtered by issueType
          if (log.status === 0 || issueType === undefined || issueType.type === log?.issue_type) {
            // Filtered by url
            if (url === undefined || log.url?.includes(url)) {
              const from = responseTimeFrom ? +responseTimeFrom : 0
              const to = responseTimeTo ? +responseTimeTo : 0

              // Filtered by responseTime
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
            }
          }
        }
      }

      return false
    })

    return filteredAccessLogs
  },
  enable: Boolean(filters)
})

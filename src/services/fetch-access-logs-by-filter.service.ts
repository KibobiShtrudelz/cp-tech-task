import { AccessLog, FormData } from '@interface'

import dummyData from './access_logs.json'
import { convertUnixTimestamp } from '@utils'

// Theis service is used to mimic data fetching from the server
// In this case, we're using the dummy data and client calculations to simulate a server response
export const fetchAccessLogsByFiltersService = (filters: FormData | undefined) => ({
  queryKey: ['accessLogs'],
  queryFn: async () => {
    const successLogs: AccessLog[] = []
    const warningLogs: AccessLog[] = []
    const errorLogs: AccessLog[] = []

    if (filters) {
      // Виж дали не може да махнеш if (filters), защото вече проверяваш с "enable: Boolean(filters)"
      if (filters.timestampFrom && filters.timestampTo) {
        const from = +filters.timestampFrom
        const to = +filters.timestampTo

        // In this case the regular for loop is more performant that Array.forEach
        for (let i = 0; i < dummyData.length; i++) {
          const log = dummyData[i]
          const timestampDay = convertUnixTimestamp(log.timestamp, 'Day')

          switch (log.status) {
            case 0: {
              if (timestampDay >= from && timestampDay <= to) {
                successLogs.push(log as AccessLog)
              }

              break
            }

            case 1: {
              if (timestampDay >= from && timestampDay <= to) {
                warningLogs.push(log as AccessLog)
              }

              break
            }

            case 2: {
              if (timestampDay >= from && timestampDay <= to) {
                errorLogs.push(log as AccessLog)
              }

              break
            }

            default: {
              break
            }
          }
        }
      }
    }

    return { successLogs, warningLogs, errorLogs }
  },
  enable: Boolean(filters)
})

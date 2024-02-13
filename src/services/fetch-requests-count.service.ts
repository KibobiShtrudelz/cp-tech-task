import { AccessLog } from '@interface'

import dummyData from './access_logs.json'

// Theis service is used to mimic data fetching from the server
export const fetchRequestsCountService = () => ({
  queryKey: ['requestsCount'],
  queryFn: async () => {
    const successLogs: AccessLog[] = []
    const warningLogs: AccessLog[] = []
    const errorLogs: AccessLog[] = []

    // In this case the regular for loop is more performant that Array.forEach
    for (let i = 0; i < dummyData.length; i++) {
      const log = dummyData[i]

      switch (log.status) {
        case 0: {
          successLogs.push(log as AccessLog)
          break
        }

        case 1: {
          warningLogs.push(log as AccessLog)
          break
        }

        case 2: {
          errorLogs.push(log as AccessLog)
          break
        }

        default: {
          break
        }
      }
    }

    return { successLogs, warningLogs, errorLogs }
  }
})

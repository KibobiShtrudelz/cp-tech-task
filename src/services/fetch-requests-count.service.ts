import { AccessLog, LogsByTypes, RequestsType } from '@interface'

import dummyData from './access_logs.json'

// This service is used to mimic data fetching from a server
// In this case, we're using the dummy data and client calculations to simulate a server response
// All of the calculations inside the service's body are meant to be done in the backend
export const fetchRequestsCountService = (type: RequestsType, selectedDay?: number) => ({
  queryKey: ['requestsCount'],
  queryFn: async () => {
    const logsByTypes: LogsByTypes = {
      successLogs: [],
      warningLogs: [],
      errorLogs: []
    }

    // In this case the regular for loop is more performant that Array.forEach
    for (let i = 0; i < dummyData.length; i++) {
      const log = dummyData[i]

      switch (log.status) {
        case 0: {
          logsByTypes.successLogs.push(log as AccessLog)
          break
        }

        case 1: {
          logsByTypes.warningLogs.push(log as AccessLog)
          break
        }

        case 2: {
          logsByTypes.errorLogs.push(log as AccessLog)
          break
        }

        default: {
          break
        }
      }
    }

    const filterLogs = (logType: 'successLogs' | 'warningLogs' | 'errorLogs') => {
      const logs = Array.from({ length: type === 'Day' ? 31 : 24 }, (_, i) => 0)

      logsByTypes?.[logType]?.forEach(accessLog => {
        const date = new Date(accessLog.timestamp * 1000)
        const day = date.getDate()
        const hour = date.getHours()

        if (type === 'Day') {
          logs[day - 1] += 1
        } else {
          if (selectedDay && day === selectedDay) {
            logs[hour] += 1
          }
        }
      })

      return logs
    }

    return {
      successLogs: filterLogs('successLogs'),
      warningLogs: filterLogs('warningLogs'),
      errorLogs: filterLogs('errorLogs')
    }
  }
})

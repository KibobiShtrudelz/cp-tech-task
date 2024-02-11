import dummyData from './access_logs.json'

// Theis service is used to mimic data fetching from the server
export const fetchAccessLogsService = () => ({
  queryKey: ['accessLogs'],
  queryFn: async () => dummyData
})

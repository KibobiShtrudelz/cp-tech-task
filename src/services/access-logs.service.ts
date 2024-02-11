import dummyData from './access_logs.json'

export const accessLogsService = () => ({
  queryKey: ['accessLogs'],
  queryFn: async () => dummyData
})

import { useQuery } from '@tanstack/react-query'

import { accessLogsService } from '@services'

import styles from './app.module.scss'

export function App() {
  const { data: accessLogs, isFetching } = useQuery(accessLogsService())
  console.log('accessLogs >>>', accessLogs)

  return (
    <div className={styles.app}>
      <h1>APP</h1>
    </div>
  )
}

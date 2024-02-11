import * as React from 'react'

import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import {
  Range,
  FormData,
  UrlFilter,
  StatusFilter,
  IssueTypeFilter,
  ResponseTimeFilter,
  TimestampRangeFilter
} from '@interface'
import { fetchAccessLogsService, fetchAccessLogsServiceByFilter } from '@services'

const range: Range<'number'> = { from: 0, to: 0 }
const { useRef, useState, useEffect } = React
const filters = [
  { name: 'URL', type: 'url' },
  { name: 'Status', type: 'status' },
  { name: 'Time Stamp', type: 'timestamp' },
  { name: 'Issue Type', type: 'issueType' },
  { name: 'Resonse Time', type: 'responseTime' }
]
const statusTypes = [
  { type: 0, name: 'Success' },
  { type: 1, name: 'Warning' },
  { type: 2, name: 'Error' }
]
const issueTypes = [
  { type: 0, name: 'Missing Parameter' },
  { type: 1, name: 'Rate limit exceeded' },
  { type: 2, name: 'Not Found' },
  { type: 3, name: 'Unknown Parameter' },
  { type: 4, name: 'Deprecated' },
  { type: 5, name: 'Unsecure' }
]

export function useApp() {
  const [urlFilterFilter, setUrlFilter] = useState<UrlFilter>('')
  const [statusFilterFilter, setStatusFilter] = useState<StatusFilter>()
  const [issueTypeFilterFilter, setIssueTypeFilter] = useState<IssueTypeFilter>()
  const [timestampRangeFilter, setTimestampRangeFilter] = useState<TimestampRangeFilter>(range)
  const [responseTimeFilterFilter, setResponseTimeFilter] = useState<ResponseTimeFilter>(range)

  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [labelsPerDay, setLabelsPerDay] = useState<string[]>([])
  const [labelsPerHour, setLabelsPerHour] = useState<string[]>([])

  //   const { data: accessLogs } = useQuery(fetchAccessLogsService())
  const { data: accessLogs } = useQuery(fetchAccessLogsServiceByFilter('selectedFilter'))
  //   console.log('accessLogs', accessLogs)

  const timestampFromToastRef = useRef(null)

  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => console.log('form data >>>', data))

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

    const data = {
      labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),

      datasets: [
        {
          type: 'bar',
          label: 'Success',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          //   data: accessLogs?.success.map(log => log.status)
          data: [50, 25, 12, 48, 90, 76, 42, 33, 45, 65, 22, 45]
        },
        {
          type: 'bar',
          label: 'Warning',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          //   data: accessLogs?.warning.map(log => log.status)
          data: [11, 21, 84, 24, 75, 37, 65, 34, 45, 65, 22, 45]
        },
        {
          type: 'bar',
          label: 'Error',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          //   data: accessLogs?.error.map(log => log.status)
          data: [41, 52, 24, 74, 23, 21, 32, 45, 65, 22, 45, 33]
        }
      ]
    }

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: { mode: 'index', intersect: false },
        legend: { labels: { color: textColor } }
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder }
        },
        y: {
          stacked: true,
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder }
        }
      }
    }

    setChartData(data)
    setChartOptions(options)
  }, [])

  return {
    control,
    filters,
    register,
    setValue,
    chartData,
    issueTypes,
    accessLogs,
    statusTypes,
    chartOptions,
    timestampFromToastRef,

    reset,
    onSubmit
  }
}

import * as React from 'react'

import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import { FormData, ChartDay } from '@interface'
import { issueTypes, statusTypes } from '@constants'
import { convertUnixTimestamp, getTimeRange } from '@utils'
import { fetchRequestsCountService, fetchAccessLogsByFiltersService } from '@services'

const { useRef, useState, useEffect, useCallback } = React

export function useApp() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [formValues, setFormValues] = useState<FormData>()
  const [chartDay, setChartDay] = useState<ChartDay>('1')
  const [requestsCountType, setRequestsCountType] = useState<'Day' | 'Hour'>('Day')

  // const { data: accessLogs, refetch } = useQuery(fetchAccessLogsByFiltersService(formValues))

  const { data: accessLogs } = useQuery(fetchRequestsCountService())

  const timestampFromToastRef = useRef(null)

  const {
    formState: { errors },
    reset,
    control,
    register,
    setValue,
    getValues,
    handleSubmit
  } = useForm<FormData>()

  const onSubmit = handleSubmit(setFormValues)

  const filterLogs = useCallback(
    (logType: 'successLogs' | 'warningLogs' | 'errorLogs') => {
      const logs = Array.from({ length: requestsCountType === 'Day' ? 31 : 24 }, (_, i) => 0)

      accessLogs?.[logType]?.forEach(accessLog => {
        const date = new Date(accessLog.timestamp * 1000)
        const day = date.getDate()
        const hour = date.getHours()

        if (requestsCountType === 'Day') {
          logs[day - 1] += 1
        } else {
          if (day === +chartDay) {
            logs[hour] += 1
          }
        }
      })

      return logs
    },
    [accessLogs, chartDay, requestsCountType]
  )

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')

    const data = {
      labels: getTimeRange(requestsCountType),

      datasets: [
        {
          type: 'bar',
          label: 'Success',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: filterLogs('successLogs')
        },
        {
          type: 'bar',
          label: 'Warning',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: filterLogs('warningLogs')
        },
        {
          type: 'bar',
          label: 'Error',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data: filterLogs('errorLogs')
        }
      ]
    }

    setChartData(data)

    setChartOptions({
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
    })
  }, [filterLogs, requestsCountType])

  return {
    errors,
    control,
    register,
    setValue,
    chartData,
    getValues,
    chartDay,
    issueTypes,
    accessLogs,
    statusTypes,
    chartOptions,
    requestsCountType,
    timestampFromToastRef,

    reset,
    onSubmit,
    setChartDay,
    setRequestsCountType
  }
}

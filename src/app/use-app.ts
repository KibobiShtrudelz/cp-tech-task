import * as React from 'react'

import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import {
  FormData,
  UrlFilter,
  StatusFilter,
  IssueTypeFilter,
  ResponseTimeFilter,
  TimestampRangeFilter
} from '@interface'
import { getDays } from '@utils'
import { issueTypes, statusTypes } from '@constants'
import { fetchAccessLogsByFiltersService } from '@services'

const { useRef, useState, useEffect } = React

export function useApp() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [formValues, setFormValues] = useState<FormData>()
  console.log('formValues >>>', formValues)

  const { data: accessLogs } = useQuery(fetchAccessLogsByFiltersService(formValues))
  // console.log('accessLogs', accessLogs)

  const timestampFromToastRef = useRef(null)

  const {
    formState: { errors },
    reset,
    control,
    register,
    setValue,
    handleSubmit
  } = useForm<FormData>()

  const onSubmit = handleSubmit(setFormValues)

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

    const data = {
      labels: getDays({ from: 0, to: 31 }),
      // labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),

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

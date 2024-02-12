import * as React from 'react'

import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import { getRemainingDays } from '@utils'
import { issueTypes, statusTypes } from '@constants'
import { fetchAccessLogsByFiltersService } from '@services'
import { FormData, AccessLog, UrlFilter, StatusFilter, IssueTypeFilter } from '@interface'

const { useRef, useState, useEffect } = React

export function useApp() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [formValues, setFormValues] = useState<FormData>()

  const { data: accessLogs, refetch } = useQuery(fetchAccessLogsByFiltersService(formValues))
  console.log('accessLogs >>>', accessLogs)

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

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

    const data = {
      // labels: getDays(+getValues()?.timestampTo - +getValues()?.timestampFrom + 1),
      labels: getRemainingDays({ from: getValues()?.timestampFrom, to: getValues()?.timestampTo }),

      datasets: [
        {
          type: 'bar',
          label: 'Success',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: accessLogs?.successLogs?.map(log => log.response_time)
          // data: [50, 25, 12, 48, 90, 76, 42, 33, 45, 65, 22, 45]
        },
        {
          type: 'bar',
          label: 'Warning',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: accessLogs?.warningLogs?.map(log => log.response_time)
          // data: [11, 21, 84, 24, 75, 37, 65, 34, 45, 65, 22, 45]
        },
        {
          type: 'bar',
          label: 'Error',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data: accessLogs?.errorLogs?.map(log => log.response_time)
          // data: [41, 52, 24, 74, 23, 21, 32, 45, 65, 22, 45, 33]
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
  }, [accessLogs?.errorLogs, accessLogs?.successLogs, accessLogs?.warningLogs, getValues])

  useEffect(() => {
    refetch()
  }, [formValues, refetch])

  return {
    errors,
    control,
    register,
    setValue,
    chartData,
    getValues,
    issueTypes,
    accessLogs,
    statusTypes,
    chartOptions,
    timestampFromToastRef,

    reset,
    onSubmit
  }
}

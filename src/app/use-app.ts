import * as React from 'react'

import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import { getTimeRange } from '@utils'
import { FormData, ChartDay } from '@interface'
import { issueTypes, statusTypes } from '@constants'
import { fetchRequestsCountService, fetchAccessLogsByFiltersService } from '@services'

const { useRef, useState, useEffect, useCallback } = React

export function useApp() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [formValues, setFormValues] = useState<FormData>()
  const [chartDay, setChartDay] = useState<ChartDay>('1')
  const [requestsCountType, setRequestsCountType] = useState<'Day' | 'Hour'>('Day')

  // const { data: accessLogs, refetch } = useQuery(fetchAccessLogsByFiltersService(formValues))

  const { data: accessLogs, refetch } = useQuery(
    fetchRequestsCountService(requestsCountType, +chartDay)
  )

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
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')

    const data = {
      labels: getTimeRange(requestsCountType),

      datasets: [
        {
          type: 'bar',
          label: 'Success',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: accessLogs?.successLogs
          // data: filterLogs('successLogs')
        },
        {
          type: 'bar',
          label: 'Warning',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: accessLogs?.warningLogs
          // data: filterLogs('warningLogs')
        },
        {
          type: 'bar',
          label: 'Error',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data: accessLogs?.errorLogs
          // data: filterLogs('errorLogs')
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
  }, [accessLogs?.errorLogs, accessLogs?.successLogs, accessLogs?.warningLogs, requestsCountType])

  useEffect(() => {
    refetch()
  }, [chartDay, requestsCountType, refetch])

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

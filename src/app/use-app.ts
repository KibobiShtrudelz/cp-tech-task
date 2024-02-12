import * as React from 'react'

import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import { FormData } from '@interface'
import { issueTypes, statusTypes } from '@constants'
import { fetchAccessLogsByFiltersService } from '@services'
import { convertUnixTimestampToDate, getRemainingDays } from '@utils'

const { useRef, useState, useEffect } = React

export function useApp() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [formValues, setFormValues] = useState<FormData>()
  console.log('formValues', formValues)

  const { data: accessLogs, refetch } = useQuery(fetchAccessLogsByFiltersService(formValues))

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
      labels: getRemainingDays({ from: getValues()?.timestampFrom, to: getValues()?.timestampTo }),

      datasets: [
        {
          type: 'bar',
          label: 'Success',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data:
            (formValues?.status === undefined || formValues?.status.type === 0) &&
            accessLogs?.successLogs?.map(log =>
              convertUnixTimestampToDate(log.response_time, 'hour')
            )
        },
        {
          type: 'bar',
          label: 'Warning',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data:
            (formValues?.status === undefined || formValues?.status.type === 1) &&
            accessLogs?.warningLogs?.map(log =>
              convertUnixTimestampToDate(log.response_time, 'hour')
            )
        },
        {
          type: 'bar',
          label: 'Error',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data:
            (formValues?.status === undefined || formValues?.status.type === 2) &&
            accessLogs?.errorLogs?.map(log => convertUnixTimestampToDate(log.response_time, 'hour'))
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
  }, [
    accessLogs?.errorLogs,
    accessLogs?.successLogs,
    accessLogs?.warningLogs,
    getValues,
    formValues
  ])

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

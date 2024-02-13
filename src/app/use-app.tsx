import * as React from 'react'

import clsx from 'clsx'
import { Skeleton } from 'primereact/skeleton'
import { useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { VirtualScrollerTemplateOptions } from 'primereact/virtualscroller'

import { getTimeRange } from '@utils'
import { issueTypes, statusTypes } from '@constants'
import { FormData, ChartDay, AccessLog } from '@interface'
import { fetchRequestsCountService, fetchAccessLogsByFiltersService } from '@services'

import styles from './app.module.scss'

const { useState, useEffect, useCallback } = React

export function useApp() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [chartDay, setChartDay] = useState<ChartDay>('1')
  const [formValues, setFormValues] = useState<FormData>()
  const [requestsCountType, setRequestsCountType] = useState<'Day' | 'Hour'>('Day')

  const { data: accessLogs, refetch: refetchAccessLogs } = useQuery(
    fetchRequestsCountService(requestsCountType, +chartDay)
  )

  const { data: filteredAccessLogs, refetch: refetchFilteredAccessLogs } = useQuery(
    fetchAccessLogsByFiltersService(formValues)
  )

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<FormData>()

  const onSubmit = handleSubmit(setFormValues)

  const getVirtualScrollerItemTemplate = useCallback(
    (item: AccessLog, options: VirtualScrollerTemplateOptions) => (
      <div
        className={clsx(
          'flex align-items-center p-2',
          options.odd && 'surface-hover',
          styles.virtualScrollerItemWrapper
        )}
        style={{ minHeight: `${options.props.itemSize}px` }}
      >
        <div className={styles.row}>
          <span>Timestamp:</span>
          <span>{item.timestamp}</span>
        </div>

        <div className={styles.row}>
          <span>Status:</span>
          <span>{item.status}</span>
        </div>

        <div className={styles.row}>
          <span>Response time:</span>
          <span>{item.response_time}</span>
        </div>

        <div className={styles.row}>
          <span>Issue Type:</span>
          <span>{item.issue_type}</span>
        </div>

        <div className={styles.row}>
          <span>URL:</span>
          <span>{item.url}</span>
        </div>
      </div>
    ),
    []
  )

  const getLoadingTemplate = useCallback(
    (options: VirtualScrollerTemplateOptions) => (
      <div
        className={clsx('flex align-items-center p-2', options.odd && 'odd')}
        style={{ minHeight: `${options.props.itemSize}px` }}
      >
        <Skeleton width={options.even ? '60%' : '50%'} height="1.3rem" />
      </div>
    ),
    []
  )

  const getFormErrorMessage = useCallback(
    (name: keyof FormData) =>
      errors[name] ? (
        <small className="p-error">{errors[name]?.message}</small>
      ) : (
        <small className="p-error">&nbsp;</small>
      ),
    [errors]
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
          data: accessLogs?.successLogs
        },
        {
          type: 'bar',
          label: 'Warning',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: accessLogs?.warningLogs
        },
        {
          type: 'bar',
          label: 'Error',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          data: accessLogs?.errorLogs
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
  }, [requestsCountType, accessLogs?.errorLogs, accessLogs?.successLogs, accessLogs?.warningLogs])

  useEffect(() => {
    refetchFilteredAccessLogs()
  }, [formValues, refetchFilteredAccessLogs])

  useEffect(() => {
    refetchAccessLogs()
  }, [chartDay, requestsCountType, refetchAccessLogs])

  return {
    // flags
    control,
    chartDay,
    chartData,
    issueTypes,
    Controller,
    statusTypes,
    chartOptions,
    requestsCountType,
    filteredAccessLogs,

    // methods
    reset,
    onSubmit,
    setChartDay,
    getLoadingTemplate,
    getFormErrorMessage,
    setRequestsCountType,
    getVirtualScrollerItemTemplate
  }
}

import * as React from 'react'

import clsx from 'clsx'
import {
  VirtualScrollerLazyEvent,
  VirtualScrollerTemplateOptions
} from 'primereact/virtualscroller'
import { Skeleton } from 'primereact/skeleton'
import { useQuery } from '@tanstack/react-query'
import { useForm, Controller, useFieldArray } from 'react-hook-form'

import { getTimeRange } from '@utils'
import { issueTypes, statusTypes } from '@constants'
import { FormData, ChartDay, AccessLog } from '@interface'
import { fetchRequestsCountService, fetchAccessLogsByFiltersService } from '@services'

import styles from './app.module.scss'
import { Divider } from 'primereact/divider'

const { useRef, useState, useEffect, useCallback } = React

export function useApp() {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [chartDay, setChartDay] = useState<ChartDay>('1')
  const [formValues, setFormValues] = useState<FormData>()
  const [lazyItems, setLazyItems] = useState<AccessLog[]>([])
  const [lazyLoading, setLazyLoading] = useState<boolean>(true)
  const [requestsCountType, setRequestsCountType] = useState<'Day' | 'Hour'>('Day')

  const loadLazyTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const { data: accessLogs, refetch: refetchAccessLogs } = useQuery(
    fetchRequestsCountService(requestsCountType, +chartDay)
  )

  const {
    data: filteredAccessLogs,
    refetch: refetchFilteredAccessLogs,
    isFetched: isFetchedFilteredAccessLogs
  } = useQuery(fetchAccessLogsByFiltersService(formValues))

  const {
    formState: { errors },
    reset,
    control,
    register,
    setValue,
    handleSubmit
  } = useForm<FormData>({
    shouldFocusError: true
  })

  const { fields } = useFieldArray({ control, name: 'status' })
  console.log('fields', fields)

  const onSubmit = handleSubmit(setFormValues)

  const getVirtualScrollerItemTemplate = useCallback(
    (item: AccessLog, options: VirtualScrollerTemplateOptions) => {
      const className = clsx('flex align-items-center p-2', options.odd && 'surface-hover')

      return (
        <div className={clsx(className, styles.virtualScrollerItemWrapper)}>
          <div className={styles.row}>
            <span>Timestamp:</span>
            <span>{item.timestamp}</span>
          </div>

          <Divider />

          <div className={styles.row}>
            <span>Status:</span>
            <span>{item.status}</span>
          </div>

          <Divider />

          <div className={styles.row}>
            <span>Response time:</span>
            <span>{item.response_time}</span>
          </div>

          <Divider />

          <div className={styles.row}>
            <span>Issue Type:</span>
            <span>{item.issue_type}</span>
          </div>

          <Divider />

          <div className={styles.row}>
            <span>URL:</span>
            <span>{item.url}</span>
          </div>
        </div>
      )
    },
    []
  )

  const getLoadingTemplate = useCallback(
    (options: VirtualScrollerTemplateOptions) => (
      <div
        className={clsx('flex align-items-center p-2', options.odd && 'odd')}
        style={{ height: '50px' }}
      >
        <Skeleton width={options.even ? '60%' : '50%'} height="1.3rem" />
      </div>
    ),
    []
  )

  const onLazyLoad = (event: VirtualScrollerLazyEvent) => {
    setLazyLoading(true)

    if (loadLazyTimeoutRef?.current) {
      clearTimeout(loadLazyTimeoutRef.current)
    }

    // Imitate delay of a backend call
    loadLazyTimeoutRef.current = setTimeout(
      () => {
        const { first, last } = event
        const _lazyItems = [...lazyItems]

        for (let i = first; i < last; i++) {
          _lazyItems[i] = `Item #${i}`
        }

        setLazyItems(_lazyItems)
        setLazyLoading(false)
      },
      Math.random() * 1000 + 250
    )
  }

  useEffect(() => {
    if (lazyLoading && isFetchedFilteredAccessLogs && filteredAccessLogs) {
      setLazyLoading(false)
    }
  }, [lazyLoading, filteredAccessLogs, isFetchedFilteredAccessLogs])

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
    refetchAccessLogs()
  }, [chartDay, requestsCountType, refetchAccessLogs])

  useEffect(() => {
    refetchFilteredAccessLogs()
  }, [formValues, refetchFilteredAccessLogs])

  return {
    errors,
    control,
    register,
    setValue,
    chartDay,
    chartData,
    issueTypes,
    accessLogs,
    Controller,
    statusTypes,
    lazyLoading,
    chartOptions,
    requestsCountType,
    filteredAccessLogs,

    reset,
    onSubmit,
    onLazyLoad,
    setChartDay,
    getLoadingTemplate,
    setRequestsCountType,
    getVirtualScrollerItemTemplate
  }
}

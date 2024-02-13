import clsx from 'clsx'
import { Chart } from 'primereact/chart'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { VirtualScroller } from 'primereact/virtualscroller'

import { getDays } from '@utils'

import { useApp } from './use-app'

import styles from './app.module.scss'

export function App() {
  const {
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
  } = useApp()

  return (
    <div className={styles.app}>
      <section className={styles.titleSection}>
        <h1>Tâche technique Crownpeak</h1>
      </section>

      <section className={styles.chartFiltersWrapper}>
        <div className={styles.chartFilters}>
          <span className="p-float-label">
            <Dropdown
              id="requestsCountType"
              value={requestsCountType}
              options={['Day', 'Hour']}
              className={styles.chartDropdown}
              onChange={e => setRequestsCountType(e.value)}
            />
            <label htmlFor="requestsCountType">Requests Count Per</label>
          </span>

          {requestsCountType === 'Hour' && (
            <span className="p-float-label">
              <Dropdown
                id="requestsCountDay"
                value={chartDay}
                options={getDays(31)}
                className={styles.chartDropdown}
                onChange={e => setChartDay(e.value)}
              />
              <label htmlFor="requestsCountDay">Select Day of Month</label>
            </span>
          )}
        </div>

        <Chart type="bar" data={chartData} options={chartOptions} />

        <Divider />
      </section>

      <section className={styles.filterSection}>
        <h1>Virtual Scroll Filters</h1>

        <form onSubmit={onSubmit}>
          <Controller
            name="timestampFrom"
            control={control}
            rules={{ required: 'Requis' }}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label">
                  <Dropdown
                    showClear
                    id={field.name}
                    value={field.value}
                    options={getDays(31)}
                    focusInputRef={field.ref}
                    className={clsx(styles.dropdown, fieldState.error && 'p-invalid')}
                    onChange={e => field.onChange(e.value)}
                  />
                  <label htmlFor="timestampFrom">Timestamp From day</label>
                </span>

                {getFormErrorMessage('timestampFrom')}
              </div>
            )}
          />

          <Controller
            name="timestampTo"
            control={control}
            rules={{ required: 'Requis' }}
            render={({ field, fieldState }) => (
              <div>
                {' '}
                <span className="p-float-label">
                  <Dropdown
                    showClear
                    id={field.name}
                    value={field.value}
                    options={getDays(31)}
                    focusInputRef={field.ref}
                    className={clsx(styles.dropdown, fieldState.error && 'p-invalid')}
                    onChange={e => field.onChange(e.value)}
                  />

                  <label htmlFor="timestampTo">Timestamp To day</label>
                </span>
                {getFormErrorMessage('timestampTo')}
              </div>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label">
                  <Dropdown
                    showClear
                    id={field.name}
                    optionLabel="name"
                    value={field.value}
                    options={statusTypes}
                    focusInputRef={field.ref}
                    className={clsx(styles.dropdown, fieldState.error && 'p-invalid')}
                    onChange={e => field.onChange(e.value)}
                  />
                  <label htmlFor="status">Status</label>
                </span>

                {getFormErrorMessage('status')}
              </div>
            )}
          />

          <Controller
            name="issueType"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label">
                  <Dropdown
                    showClear
                    id={field.name}
                    optionLabel="name"
                    value={field.value}
                    options={issueTypes}
                    focusInputRef={field.ref}
                    className={clsx(styles.dropdown, fieldState.error && 'p-invalid')}
                    onChange={e => field.onChange(e.value)}
                  />
                  <label htmlFor="issueType">Issue Type</label>
                </span>

                {getFormErrorMessage('issueType')}
              </div>
            )}
          />

          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label">
                  <InputText
                    id={field.name}
                    value={field.value || ''}
                    className={clsx(fieldState.error && 'p-invalid')}
                    onChange={e => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>URL</label>
                </span>

                {getFormErrorMessage('url')}
              </div>
            )}
          />

          <Controller
            name="responseTimeFrom"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label">
                  <InputText
                    keyfilter="int"
                    id={field.name}
                    value={field.value || ''}
                    className={clsx(fieldState.error && 'p-invalid')}
                    onChange={e => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Response time From</label>
                </span>

                {getFormErrorMessage('responseTimeFrom')}
              </div>
            )}
          />

          <Controller
            name="responseTimeTo"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <span className="p-float-label">
                  <InputText
                    keyfilter="int"
                    id={field.name}
                    value={field.value || ''}
                    className={clsx(fieldState.error && 'p-invalid')}
                    onChange={e => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Response time To</label>
                </span>

                {getFormErrorMessage('responseTimeTo')}
              </div>
            )}
          />

          <Button
            type="reset"
            label="Reset"
            severity="secondary"
            className={styles.button}
            onClick={reset as React.MouseEventHandler<HTMLButtonElement>}
          />

          <Button className={styles.button} type="submit" label="Submit" />
        </form>
      </section>

      <section className={styles.virtualScrollSection}>
        <div className={styles.container}>
          {filteredAccessLogs ? (
            <VirtualScroller
              showLoader
              delay={250}
              itemSize={250}
              items={filteredAccessLogs}
              style={{ height: '500px' }}
              loadingTemplate={getLoadingTemplate}
              itemTemplate={getVirtualScrollerItemTemplate}
              className="border-1 surface-border border-round"
            />
          ) : (
            <h3>Oups, aucune entrée avec de tels critères :)</h3>
          )}
        </div>
      </section>
    </div>
  )
}

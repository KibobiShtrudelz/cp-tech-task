import clsx from 'clsx'
import { Chart } from 'primereact/chart'
import { Button } from 'primereact/button'
import { Controller } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { VirtualScroller } from 'primereact/virtualscroller'

import { getDays } from '@utils'

import { useApp } from './use-app'

import styles from './app.module.scss'

export function App() {
  const {
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
  } = useApp()

  return (
    <div className={styles.app}>
      <section className={styles.titleSection}>
        <h1>Crownpeak Tech Task</h1>
      </section>

      <section className={styles.filterSection}>
        <form onSubmit={onSubmit}>
          <Controller
            name="timestamp.from"
            control={control}
            render={({ field, fieldState }) => (
              <span className="p-float-label">
                <Dropdown
                  showClear
                  id={field.name}
                  value={field.value}
                  focusInputRef={field.ref}
                  options={getDays({ from: 0, to: 31 }) || []}
                  className={clsx(styles.dropdown, fieldState.error && 'p-invalid')}
                  onChange={e => field.onChange(e.value)}
                />
                <label htmlFor="dd-filter">Timestamp From day</label>
              </span>
            )}
          />

          <Controller
            name="timestamp.to"
            control={control}
            render={({ field, fieldState }) => (
              <span className="p-float-label">
                <Dropdown
                  showClear
                  id={field.name}
                  value={field.value}
                  focusInputRef={field.ref}
                  options={getDays({ from: 0, to: 31 }) || []}
                  className={clsx(styles.dropdown, fieldState.error && 'p-invalid')}
                  onChange={e => field.onChange(e.value)}
                />
                <label htmlFor="dd-filter">Timestamp To day</label>
              </span>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
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
                <label htmlFor="dd-filter">Status</label>
              </span>
            )}
          />

          <Controller
            name="issueType"
            control={control}
            render={({ field, fieldState }) => (
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
                <label htmlFor="dd-filter">Issue Type</label>
              </span>
            )}
          />

          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value || ''}
                  className={clsx(fieldState.error && 'p-invalid')}
                  onChange={e => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>URL</label>
              </span>
            )}
          />

          <Controller
            name="responseTime.from"
            control={control}
            render={({ field, fieldState }) => (
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
            )}
          />

          <Controller
            name="responseTime.to"
            control={control}
            render={({ field, fieldState }) => (
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
            )}
          />

          <Button
            type="reset"
            label="Reset"
            severity="secondary"
            className={styles.button}
            onClick={reset} // @@@ Fix typing
          />

          <Button className={styles.button} type="submit" label="Submit" />
        </form>
      </section>

      {/* <section>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </section> */}
    </div>
  )
}

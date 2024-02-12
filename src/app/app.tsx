import clsx from 'clsx'
import { Chart } from 'primereact/chart'
import { Button } from 'primereact/button'
import { Controller } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { VirtualScroller } from 'primereact/virtualscroller'

import { getDays } from '@utils'
import { FormData } from '@interface'

import { useApp } from './use-app'

import styles from './app.module.scss'

export function App() {
  const {
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
  } = useApp()

  const getFormErrorMessage = (name: keyof FormData) =>
    errors[name] ? (
      <small className="p-error">{errors[name]?.message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    )

  return (
    <div className={styles.app}>
      <section className={styles.titleSection}>
        <h1>Tâche technique Crownpeak</h1>
      </section>

      <section className={styles.filterSection}>
        <form onSubmit={onSubmit}>
          <Controller
            name="timestampFrom"
            control={control}
            // rules={{
            //   required:
            //     !getValues()?.timestampFrom && getValues()?.timestampTo?.length > 0
            //       ? 'Use with Timestamp To'
            //       : false
            // }}
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
                  <label htmlFor="dd-filter">Timestamp From day</label>
                </span>

                {getFormErrorMessage('timestampFrom')}
              </div>
            )}
          />

          <Controller
            name="timestampTo"
            control={control}
            // rules={{
            //   required:
            //     !getValues()?.timestampTo && getValues()?.timestampFrom?.length > 0
            //       ? 'Use with Timestamp From'
            //       : false
            // }}
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

                  <label htmlFor="dd-filter">Timestamp To day</label>
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
                  <label htmlFor="dd-filter">Status</label>
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
                  <label htmlFor="dd-filter">Issue Type</label>
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
            onClick={reset} // @@@ Fix typing
          />

          <Button className={styles.button} type="submit" label="Submit" />
        </form>
      </section>

      <section>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </section>

      <section>
        <VirtualScroller
          items={[1, 2, 3, 4, 5]}
          itemSize={50}
          // itemTemplate={itemTemplate}
          className={styles.virtualScroller}
          style={{ width: '200px', height: '200px' }}
        />
      </section>
    </div>
  )
}

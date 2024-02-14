import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { App } from './app/app'

import 'primereact/resources/themes/lara-dark-blue/theme.css'

import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const primeReactValues = {
  ripple: true,
  cssTransition: true
}

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={primeReactValues}>
        <App />
      </PrimeReactProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)

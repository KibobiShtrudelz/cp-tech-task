import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import * as ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import { BrowserRouter as Router } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { App } from './app/app'

import { store } from './redux/store'

import 'primereact/resources/themes/saga-blue/theme.css'

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <PrimeReactProvider value={primeReactValues}>
            <App />
          </PrimeReactProvider>
        </Router>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)

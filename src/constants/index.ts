import { Range } from '@interface'

export const statusTypes = [
  { type: 0, name: 'Success' },
  { type: 1, name: 'Warning' },
  { type: 2, name: 'Error' }
]

export const issueTypes = [
  { type: 0, name: 'Missing Parameter' },
  { type: 1, name: 'Rate limit exceeded' },
  { type: 2, name: 'Not Found' },
  { type: 3, name: 'Unknown Parameter' },
  { type: 4, name: 'Deprecated' },
  { type: 5, name: 'Unsecure' }
]

export const range: Range = { from: '0', to: '0' }

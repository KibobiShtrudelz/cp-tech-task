// export type Filter = 'all' | 'url' | 'status' | 'timestamp' | 'issueType' | 'responseTime'

export type Range<T = 'string' | 'number'> = {
  from: T extends 'number' ? number : string
  to: T extends 'number' ? number : string
}

export type FormData = {
  url: string
  status: number
  issueType: number
  timestamp: Range<'number'>
  responseTime: Range<'string'>
}

export type UrlFilter = string

export type StatusFilter = 0 | 1 | 2

export type ResponseTimeFilter = Range<'string'>

export type TimestampRangeFilter = Range<'number'>

export type IssueTypeFilter = 0 | 1 | 2 | 3 | 4 | 5

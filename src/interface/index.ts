// export type Filter = 'all' | 'url' | 'status' | 'timestamp' | 'issueType' | 'responseTime'

export type Range = {
  from: number
  to: number
}

export type FormData = {
  url: string
  status: number
  timestamp: Range
  issueType: number
  responseTime: Range
}

export type TimestampRangeFilter = Range

export type StatusFilter = 0 | 1 | 2

export type IssueTypeFilter = 0 | 1 | 2 | 3 | 4 | 5

export type UrlFilter = string

export type ResponseTimeFilter = Range

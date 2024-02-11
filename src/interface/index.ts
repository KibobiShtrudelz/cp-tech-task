export type Range = {
  from: string
  to: string
}

export type FormData = {
  url: string
  status: number
  issueType: number
  timestamp: Range
  responseTime: Range
}

export type UrlFilter = string

export type StatusFilter = 0 | 1 | 2

export type ResponseTimeFilter = Range

export type TimestampRangeFilter = Range

export type IssueTypeFilter = 0 | 1 | 2 | 3 | 4 | 5

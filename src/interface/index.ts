export type Range = {
  from: string
  to: string
}

export type FormData = {
  url: string
  status: StatusFilter
  issueType: IssueTypeFilter
  timestampFrom: string
  timestampTo: string
  responseTimeFrom: string
  responseTimeTo: string
}

export type UrlFilter = string

export type StatusFilter = 0 | 1 | 2

export type IssueTypeFilter = 0 | 1 | 2 | 3 | 4 | 5

export type AccessLog = {
  url: string
  timestamp: number
  status: StatusFilter
  response_time: number
  issue_details?: string
  issue_type?: IssueTypeFilter
}

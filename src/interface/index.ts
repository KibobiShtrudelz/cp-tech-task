export type Range = {
  from: string
  to: string
}

export type DropdownOption = {
  type: number
  name: string
}

export type FormData = {
  url: string
  status: DropdownOption
  issueType: DropdownOption
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

export type LogsByTypes = {
  successLogs: AccessLog[]
  warningLogs: AccessLog[]
  errorLogs: AccessLog[]
}

export type RequestsType = 'Day' | 'Hour'

export type ChartDay =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'

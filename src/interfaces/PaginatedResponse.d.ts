type PaginatedResponse<Payload> = GenericResponse<{
  pageNumber: number
  pageSize: number
  totalPage: number
  totalData: number
  content: Payload[]
}>
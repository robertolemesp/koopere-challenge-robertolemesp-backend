export type GenericResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

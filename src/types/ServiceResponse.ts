type ErrorResponse = {
  status: 'INTERNAL_ERROR' | 'NOT_FOUND',
  message: string,
  type: 'error',
  data?: null,
};

type SuccessResponse<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T
  type: 'success',
};

export type ServiceResponse<T> = ErrorResponse | SuccessResponse<T>;
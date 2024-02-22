type ErrorResponse = {
  status: 'INVALID_VALUE' | 'INTERNAL_ERROR' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'BAD_REQUEST',
  message: string,
  type: 'error',
  data?: null,
};

type SuccessResponse<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  message?: string,
  data: T
  type: 'success',
};

export type ServiceResponse<T> = ErrorResponse | SuccessResponse<T>;
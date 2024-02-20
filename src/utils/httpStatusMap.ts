type StatusKey =
'SUCCESSFUL' | 'CREATED' | 'NOT_FOUND' | 'CONFLICT' | 'INVALID_VALUE' | 'UNAUTHORIZED';

const httpErrorMap: Record<StatusKey, number> = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  UNAUTHORIZED: 401,
};

const statusHTTP = (status: StatusKey): number => httpErrorMap[status] || 500;

export default statusHTTP;
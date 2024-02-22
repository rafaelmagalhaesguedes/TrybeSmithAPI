type StatusKey =
'SUCCESSFUL' | 'CREATED' | 'NOT_FOUND' | 'INVALID_VALUE' | 'UNAUTHORIZED' |
'INTERNAL_ERROR';

const httpErrorMap: Record<StatusKey, number> = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
  UNAUTHORIZED: 401,
  INTERNAL_ERROR: 500,
};

const statusHTTP = (status: StatusKey): number => httpErrorMap[status] || 500;

export default statusHTTP;
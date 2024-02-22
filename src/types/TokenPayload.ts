type TokenPayload = {
  id: number,
  username: string,
};

export type TokenGeneratedResponse = {
  token: string,
};

export default TokenPayload;
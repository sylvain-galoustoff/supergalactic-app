export type ResponseType = {
  success: boolean;
  payload: any;
  message: string;
};

export const response = (
  success: boolean,
  payload: any,
  message: string
): ResponseType => {
  return {
    success,
    payload,
    message,
  };
};

type GenericResponse<Payload> = {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: Payload;
};
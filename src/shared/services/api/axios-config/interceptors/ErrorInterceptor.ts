import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === "Network error") {
    return Promise.reject(new Error("Erro na conexão!"));
  }

  if (error.response?.status === 401) {
    //
  }
  return Promise.reject(error);
};

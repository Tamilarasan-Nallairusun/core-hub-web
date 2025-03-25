export interface BaseResponse<T> {
    code: number; 
    message: string; 
    isSuccess: boolean; 
    data: T;
  }
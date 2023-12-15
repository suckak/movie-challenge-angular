import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from './apiResponse';

export interface requestResponse<T> {
  isLoading: boolean;
  error: HttpErrorResponse | Error | null;
  data: ApiResponse | T | null;
}

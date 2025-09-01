import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UseApiReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  request: (...args: any[]) => Promise<T | null>;
}

export const useApi = <T>(
  apiFunc: (...args: any[]) => Promise<any>
): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async (...args: any[]): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
      if(result.data.message)
        toast.success(result.data.message);
      return result.data;
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      const errorMessage = axiosError.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, error, loading, request };
};
import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Allows web requests to be aborted
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(res.data.results);
        setLoading(false); // Ideally should go in 'finally'
      })
      .catch((err) => {
        // Check for cancelled requests
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    // Cleanup
    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;

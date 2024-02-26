import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Allows web requests to be aborted
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGenresResponse>('/genres', { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
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

  return { genres, error, isLoading };
};

export default useGenres;

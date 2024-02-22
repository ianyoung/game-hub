import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

export interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Allows web requests to be aborted
    const controller = new AbortController();

    apiClient
      .get<FetchGamesResponse>('/games', { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        // Check for cancelled requests
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    // Cleanup
    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
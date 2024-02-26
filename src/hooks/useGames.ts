import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Allows web requests to be aborted
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGamesResponse>('/games', { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
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

  return { games, error, isLoading };
};

export default useGames;

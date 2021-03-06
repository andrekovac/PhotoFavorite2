import { useState, useEffect } from 'react';

import { PhotoT } from '../domain/photos';

/**
 * Adapted from https://www.robinwieruch.de/react-hooks-fetch-data
 *
 * See section "Custom Data Fetching Hook" for an explanation and comments about this hook.
 */
const useDataApi = (initialData: ReadonlyArray<PhotoT>, initialUrl: string) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(url);

        const result = await response.json();
        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl] as const;
};

export default useDataApi;

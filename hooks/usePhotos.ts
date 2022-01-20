import { useEffect, useState } from 'react';

const usePhotos = (page: number) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ItemT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=100`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, isLoading };
};

export default usePhotos;

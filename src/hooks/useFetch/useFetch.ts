import { MutableRefObject, useEffect, useState } from 'react';
import { axiosInstance } from '../../services';

interface IFetchConfig {
  page?: number;
  size?: number;
}

export const useFetch = (
  url: string,
  config = { page: 0, size: 10 } as IFetchConfig,
  ref: MutableRefObject<boolean>,
  initialValue
) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          const res = await axiosInstance.get(
            `${url}?page=${config.page}&size=${config.size}`
          );
          const data = await res.data;
          setData(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }

    return () => {
      ref.current = false;
    };
  }, [url, ref, config]);

  return { loading, error, data };
};

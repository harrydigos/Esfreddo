import { useEffect, useState } from "react";

export const useDebounce = <T extends unknown>(query: T, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState<T>(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(query);
    }, delay);
    return () => clearTimeout(timeout);
  }, [query, delay]);

  return debounceValue;
};

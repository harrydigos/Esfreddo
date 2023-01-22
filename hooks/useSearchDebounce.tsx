import { useEffect, useState } from "react";

export const useSearchDebounce = (query: string, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(query);
    }, delay);
    return () => clearTimeout(timeout);
  }, [query, delay]);

  return debounceValue;
};

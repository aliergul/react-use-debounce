import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    if (value === "") {
      setDebouncedValue("");
    }
    if (value) {
      const timeout = setTimeout(() => setDebouncedValue(value), delay);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [value]); //eslint-disable-line
  return debouncedValue;
}

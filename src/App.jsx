import { useEffect, useState } from "react";
import "./App.css";
import { useDebounce } from "./use-debounce";

function App() {
  const [value, setValue] = useState("");
  const [queries, setQueries] = useState([]);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedValue) {
      fetch(`http://localhost/api/?query=${debouncedValue}`);
    }
  }, [debouncedValue]);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const [resource, config] = args;

      setQueries((prev) => [
        ...prev,
        `URL: ${resource}, Method: ${config?.method || "GET"}`,
      ]);

      const response = await originalFetch(...args);
      return response;
    };

    if (value === "") {
      setQueries([]);
    }

    return () => {
      window.fetch = originalFetch;
    };
  }, [value]);

  return (
    <>
      <h1>React Debounce</h1>
      <div className="content">
        <input
          value={value}
          className="input"
          onChange={(e) => setValue(e.target.value)}
        />
        <span>Value: {debouncedValue}</span>
        {value &&
          queries.map((query, index) => (
            <span className="queries" key={index}>
              {query}
            </span>
          ))}
      </div>
    </>
  );
}

export default App;

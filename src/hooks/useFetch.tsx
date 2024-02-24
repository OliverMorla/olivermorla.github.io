/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

const useFetch = (url: string, options: RequestInit = {}) => {
  const [response, setResponse] = useState<null | []>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setResponse(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { response, error, loading };
};

export default useFetch;

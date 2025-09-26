import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const useFetch = (cb) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await cb(...args);

      // Check if response is null/undefined (invalid payload issue)
      if (response == null) {
        throw new Error("Received null response from server");
      }

      setData(response);
      return response;
    } catch (err) {
      setError(err);
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;

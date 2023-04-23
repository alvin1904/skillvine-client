import { useState, useCallback, useEffect } from "react";
export default function useAxiosCaller() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (theFunction, data) => {
    try {
      setLoading(true);
      const response = await theFunction(data && data);
      console.log(response);
      setData(response.data);
    } catch (error) {
      setError(error.response.status);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

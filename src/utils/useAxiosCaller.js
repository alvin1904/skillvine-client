import { useState } from "react";
export default function useAxiosCaller() {
  const [loading, setLoading] = useState(false);

  const fetchData = async (theFunction, data, data1) => {
    try {
      setLoading(true);
      const response = await theFunction(data, data1);
      return response;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchData };
}

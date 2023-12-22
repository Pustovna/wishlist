import { useEffect, useState } from "react";

const useFetch = (url : String) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url as string)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [url]);
  return data;
};

export default useFetch;
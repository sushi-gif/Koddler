import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyArea from "../EmptyArea/EmptyArea";
import ReactJson from "react-json-view";

const Current = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("koddler-rest/api/admin/currentRents.php", {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <div>{data.length > 0 ? <ReactJson src={data} /> : <EmptyArea />}</div>
  );
};

export default Current;

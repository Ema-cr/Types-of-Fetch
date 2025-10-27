"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [info, setInfo] = useState([]);

  useEffect(() => {

    try {
      const fetchData = async () => {
        const { data, status } = await axios.get("https://fakestoreapi.com/products");

        setInfo(data)
        console.log(status)
      };
      fetchData();
    }catch{}
    
  }, []);

  console.log(info);
  return(
    <div>
      <h1>Data Fetching</h1>
      <div>
        {info.map((element:any) => (
          <div key={element.id}>
            <div>{element.title}</div>
          </div>
        ))}
      </div>
    </div>
  );

}
import React, { useEffect } from "react";
import axios from "../axios";
function FetchRoads() {
  const fetchRoads = async () => {
    try {
      const response = await axios.get("/api/roads");
      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchRoads();
  });
  return;
}

export default FetchRoads;

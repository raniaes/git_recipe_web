import Header from "./Header";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Recipe_List() {
  const location = useLocation();
  const [id, setId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.Id) {
      sessionStorage.setItem("userId", location.state.Id);
      setId(location.state.Id);
    } else {
      const storedId = sessionStorage.getItem("userId");
      setId(storedId);
    }
  }, [location.state]);

  return (
    <div>
      <Header />
      <div>
        <h1>Recipe list Page</h1>
      </div>
    </div>
  );
}

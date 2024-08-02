import Header from "./Header";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Recipe from "./Recipe";
import React, { useEffect, useState, useRef } from "react";

export default function Recipe_List() {
  const location = useLocation();
  const [id, setId] = useState(null);
  const [url, setUrl] = useState(`https://localhost:7230/api/Recipe`);
  const recipeList = useFetch(url);
  const NameRef = useRef(null);
  const FilterRef = useRef(null);
  const categories = useFetch(`https://localhost:7230/api/Category`);

  useEffect(() => {
    if (location.state && location.state.Id) {
      sessionStorage.setItem("userId", location.state.Id);
      setId(location.state.Id);
    } else {
      const storedId = sessionStorage.getItem("userId");
      setId(storedId);
    }
  }, [location.state]);

  function search() {
    if (NameRef.current.value.length > 2) {
      if (FilterRef.current.value === "None") {
        setUrl(
          `https://localhost:7230/api/Recipe/search/${NameRef.current.value}`
        );
      } else {
        setUrl(
          `https://localhost:7230/api/Recipe/filter_search/${FilterRef.current.value}/${NameRef.current.value}`
        );
      }
    } else {
      alert("Write Name over 3 words");
    }
  }

  function filter(event) {
    if (event.target.value === "None") {
      setUrl(`https://localhost:7230/api/Recipe`);
    } else {
      setUrl(`https://localhost:7230/api/Recipe/filter/${event.target.value}`);
    }
  }

  return (
    <>
      <Header />

      <div className="input_search">
        <input type="text" placeholder="Name" ref={NameRef} />
        <button onClick={search}>search</button>
        <select ref={FilterRef} onChange={filter}>
          <option value="None">None</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ border: "none", fontWeight: "bold", color: "green" }}>
              Name
            </td>
            <td style={{ border: "none", fontWeight: "bold", color: "green" }}>
              Category
            </td>
            <td style={{ border: "none", fontWeight: "bold", color: "green" }}>
              Writer
            </td>
          </tr>
          {recipeList.map((recipe) => (
            <Recipe recipe={recipe} key={recipe.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

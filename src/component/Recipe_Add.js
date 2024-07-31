import useFetch from "../hooks/useFetch";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Recipe_Add() {
  const categorys = useFetch("https://localhost:7225/api/Category");
  const ingredients = useFetch("https://localhost:7225/api/Ingredient");
  const storedId = sessionStorage.getItem("userId");

  const history = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleAddClick = () => {
    const selectedOption =
      ingreRef.current.options[ingreRef.current.selectedIndex];
    const newIngredient = {
      id: parseInt(selectedOption.getAttribute("data-id"), 10),
      name: selectedOption.value,
    };
    const updatedIngredients = [...selectedIngredients, newIngredient];
    setSelectedIngredients(updatedIngredients);

    // Print the array to the console
    console.log("Selected Ingredients:", updatedIngredients);
  };

  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);

      const ingreIds = selectedIngredients.map((ingredient) => ingredient.id);
      const userId = storedId;
      const categoryId = parseInt(
        categoryRef.current.options[
          categoryRef.current.selectedIndex
        ].getAttribute("dataid"),
        10
      );
      let url = `https://localhost:7225/api/Recipe?userId=${userId}&categoryId=${categoryId}`;
      ingreIds.forEach((id) => {
        url += `&ingreId=${id}`;
      });

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          instruction: instRef.current.value,
          pic_address: picRef.current.value,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("Registration success.");
          history("/RecipeList");
          setIsLoading(false);
        } else if (res.status === 422) {
          alert("Already Exist same Recipe.");
          history("/RecipeAdd");
          setIsLoading(false);
        }
      });
    }
  }

  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const ingreRef = useRef(null);
  const instRef = useRef(null);
  const picRef = useRef(null);

  return (
    <form onSubmit={onSubmit}>
      <h1>{storedId}</h1>
      <h1>Recipe Register Form</h1>
      <div className="input_area">
        <label>Recipe Name</label>
        <input type="text" ref={nameRef} />
      </div>
      <div className="input_area">
        <label>Category</label>
        <select ref={categoryRef}>
          {categorys.map((ct) => (
            <option key={ct.id} value={ct.name} dataid={ct.id}>
              {ct.name}
            </option>
          ))}
        </select>
      </div>
      <div className="input_area">
        <label>Ingredient Select</label>
        <select ref={ingreRef}>
          {ingredients.map((ingre) => (
            <option key={ingre.id} value={ingre.name} data-id={ingre.id}>
              {ingre.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddClick} type="button">
          Add
        </button>
      </div>
      <div>
        <table>
          <tbody>
            {selectedIngredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="input_area">
        <label>Instruction</label>
        <input type="text" ref={instRef} />
      </div>
      <div className="input_area">
        <label>Picture</label>
        <input type="text" ref={picRef} placeholder="pic_address" />
      </div>
      <button style={{ opacity: isLoading ? 0.3 : 1 }}>
        {isLoading ? "Saveing..." : "Save"}
      </button>
      <Link
        to="/RecipeList"
        style={{ marginLeft: "10px", textDecoration: "none" }}
      >
        <button className="backbutton" type="button">
          Back to Recipe List
        </button>
      </Link>
    </form>
  );
}

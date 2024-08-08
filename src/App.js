import Login from "./component/Login";
import User_Register from "./component/User_Register";
import Recipe_List from "./component/Recipe_List";
import Recipe_Add from "./component/Recipe_Add";
import Dt_Recipe from "./component/Dt_Recipe";
import Recipe_Modify from "./component/Recipe_modify";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<User_Register />} />
          <Route path="/RecipeList" element={<Recipe_List />} />
          <Route path="/RecipeAdd" element={<Recipe_Add />} />
          <Route
            path="/RecipeList/Recipe/:Recipe/:UId"
            element={<Dt_Recipe />}
          />
          <Route
            path="/RecipeList/Recipe/Modify/:Recipe"
            element={<Recipe_Modify />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

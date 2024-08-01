import { useState } from "react"
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Recipe(props){
    const [recipe, setrecipe] = useState(props.recipe);
    const category = useFetch(`https://localhost:7225/api/Category/${recipe.categoryId}`);
    const user = useFetch(`https://localhost:7225/api/User/${recipe.userId}`);
    
    return (
        <tr>
            <td style={{ border: 'none' }}><Link to={`/RecipeList/Recipe/${recipe.id}`}>{recipe.name}</Link></td>
            <td style={{ border: 'none' }}>{category.name}</td>
            <td style={{ border: 'none' }}>{user.userId}</td>
        </tr>
    )
}
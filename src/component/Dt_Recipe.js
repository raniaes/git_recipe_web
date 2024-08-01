import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "./Header";
import { useEffect, useState, useRef } from "react";
import Review from "./Review";

export default function Dt_Recipe() {

    const recipe_id = useParams().Recipe;
    const recipe = useFetch(`https://localhost:7225/api/Recipe/${recipe_id}`);
    const storedId = sessionStorage.getItem("userId");
    const ingredient = useFetch(`https://localhost:7225/api/Ingredient/${recipe_id}/ingredient`);
    const [ingreList, SetIngreList] = useState('');
    const [instru, SetInstru] = useState([]);
    const FilterRef = useRef(null);
    const getuser = useFetch(`https://localhost:7225/api/User/${storedId}`);
    const [url, setUrl] = useState(`https://localhost:7225/api/Review/${recipe_id}/review`);
    const reviewList = useFetch(url);


    useEffect(() => {
        if (ingredient) {
            const names = ingredient.map(ingre => ingre.name).join(', ');
            SetIngreList(names);
        }
    }, [ingredient])

    useEffect(() => {
        if (recipe && recipe.instruction) {
            const instructionsArray = recipe.instruction.split(',').map((item, index) =>
                `${index + 1}. ${item.trim()}`
            );
            SetInstru(instructionsArray);
        }
    }, [recipe])

    function review_change(event){
        if (event.target.value === "None"){
            setUrl(`https://localhost:7225/api/Review/${recipe_id}/review`);
        }
        else{
            setUrl(`https://localhost:7225/api/Review/${recipe_id}/${storedId}/review`);
        }
    }

    return (
        <>
            <Header />

            <h2 style={{ color: "Red" }}>{recipe.name}</h2>
            <div className="recipe_div">
                <h3 style={{ color: "green" }}>Ingredient</h3>
                {ingreList}
            </div>
            <div className="recipe_div">
                <h3 style={{ color: "skyblue" }}>Instruction</h3>
                {instru.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
            <div className="recipe_div" style={{ position: 'relative' }}>
                <h3 style={{ color: "purple" }}>Review</h3>
                <select style={{position: 'absolute', right: '10px', marginTop: '-20px' }} ref={FilterRef} onChange={review_change}>
                    <option value="None">None</option>
                    <option value={getuser.userId}>{getuser.userId}</option>
                </select>
                <table className="table_review">
                <tbody>
                    <tr>
                        <td style={{ border: 'none', fontWeight: 'bold', color: 'grey' }}>Title</td>
                        <td style={{ border: 'none', fontWeight: 'bold', color: 'grey' }}>Content</td>
                        <td style={{ border: 'none', fontWeight: 'bold', color: 'grey' }}>Reviewer</td>
                        <td style={{ border: 'none', fontWeight: 'bold', color: 'grey' }}>Rating</td>
                    </tr>
                    {reviewList.map(review => (
                        <Review review={review} key={review.id} />
                    ))}
                </tbody>
            </table>
            </div>
        </>
    );
}
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "./Header";
import { useEffect, useState, useRef } from "react";
import Review from "./Review";


export default function Dt_Recipe() {

    const recipe_id = useParams().Recipe;
    const user_id = useParams().UId;
    const [match_writer, Setmatch_writer] = useState(false);
    const recipe = useFetch(`https://localhost:7230/api/Recipe/${recipe_id}`);
    const storedId = sessionStorage.getItem("userId");
    const ingredient = useFetch(`https://localhost:7230/api/Ingredient/${recipe_id}/ingredient`);
    const [ingreList, SetIngreList] = useState('');
    const [instru, SetInstru] = useState([]);
    const FilterRef = useRef(null);
    const getuser = useFetch(`https://localhost:7230/api/User/${storedId}`);
    const [url, setUrl] = useState(`https://localhost:7230/api/Review/${recipe_id}/review`);
    const [reviewList, setReviewList] = useState([]);
    const ContentRef = useRef(null);
    const RatingRef = useRef(null);
    const [status, setStatus] = useState('');

  useEffect(() => {
    if (ingredient) {
      const names = ingredient.map((ingre) => ingre.name).join(", ");
      SetIngreList(names);
    }
  }, [ingredient]);
  
  useEffect(() => {
    if (recipe && recipe.instruction) {
      const instructionsArray = recipe.instruction
        .split(",")
        .map((item, index) => `${index + 1}. ${item.trim()}`);
      SetInstru(instructionsArray);
    }
  }, [recipe]);

  useEffect(() => {
    if (user_id === getuser.userId) {
      Setmatch_writer(true);
    } else {
      Setmatch_writer(false);
    }
  }, [user_id, getuser.userId]);

    useEffect(() => {
        fetch(url)
            .then(res => {
                return res.json()
            }).then(data =>
                setReviewList(data)
            ).catch(() => 
                setReviewList([])
            );
    }, [url]);

    function review_change(event) {
        if (event.target.value === "None") {
            setUrl(`https://localhost:7230/api/Review/${recipe_id}/review`);
        }
        else {
            setUrl(`https://localhost:7230/api/Review/${recipe_id}/${storedId}/review`);
        }
    }
  
    function onSubmit(e) {
        e.preventDefault();
        if (FilterRef.current.value === 'None') {
            FilterRef.current.value = getuser.userId;
        }

        review_change({ target: { value: getuser.userId } });

        fetch("https://localhost:7230/api/Review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: new Date().toISOString(),
                content: ContentRef.current.value,
                rating: RatingRef.current.value,
                userId: storedId,
                recipeId: recipe_id
            }),
        }).then((res) => {
            if (res.ok) {
                setStatus("Add review success.");
                ContentRef.current.value = '';
                RatingRef.current.value = '1';

                if (FilterRef.current) {
                    FilterRef.current.value = 'None';
                }

                review_change({ target: { value: 'None' } });
            } else {
                setStatus("Failed to add review.");
            }
        }).catch(() => {
            setStatus("Failed to add review.");
        });
    }

    function handleDelete(reviewId) {
        setReviewList(prevReviews => prevReviews.filter(review => review.id !== reviewId));
    }

    return (
        <>
            <Header />

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={{ color: "Red" }}>{recipe.name}</h2>
                {match_writer && (
                    <Link style={{ marginLeft: "auto" }} to={`/RecipeList/Recipe/Modify/${recipe_id}`}>
                        <button>Modify</button>
                    </Link>
                )}
                {match_writer && (
                    <button >Delete</button>
                )}
            </div>
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

                <form onSubmit={onSubmit}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="text" style={{ width: "400px" }} placeholder="Content" ref={ContentRef} />
                        <select style={{ marginLeft: '5px' }} ref={RatingRef}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button className="button_Add_review" style={{ marginLeft: '5px' }}>Add</button>
                    </div>
                </form>

                <div style={{ display: 'flex' }}>
                    <select style={{ marginLeft: 'auto' }} ref={FilterRef} onChange={review_change}>
                        <option value="None">None</option>
                        <option value={getuser.userId}>{getuser.userId}</option>
                    </select>
                </div>  
                <table className="table_review">
                    <tbody>
                        <tr>
                            <td style={{ border: 'none', fontWeight: 'bold', color: 'grey' }}>Date</td>
                            <td style={{ border: 'none', fontWeight: 'bold', color: 'grey' }}>Content</td>
                            <td style={{ border: 'none', fontWeight: 'bold', color: 'grey' }}>Reviewer</td>
                            <td style={{ border: 'none', fontWeight: 'bold', color: 'grey' }}>Rating</td>
                        </tr>
                        {reviewList.map(review => (
                            <Review review={review} key={review.id} onDelete={handleDelete} />
                        ))}
                    </tbody>
                </table>
                <div className="next_back_div">
                    <button>Back</button>
                    <button>Next</button>
                </div>
            </div>
        </>
    );
}
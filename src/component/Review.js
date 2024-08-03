import useFetch from "../hooks/useFetch";
import { useState } from "react";

export default function Review(props) {
    const [review, setReview] = useState(props.review);
    const reviewer = useFetch(`https://localhost:7230/api/User/${review.userId}`);
    const storedId = sessionStorage.getItem("userId");

    function del_btn() {
        const reviewuserId = Number(review.userId);
        const storeduserId = Number(storedId);

        if (reviewuserId !== storeduserId) {
            alert(`is not your review!!`);
        }else{
            if (window.confirm('do you want delete?')) {
                fetch(`https://localhost:7230/api/Review/${review.id}`,{
                    method: 'DELETE'
                }).then(res =>{
                    if (res.ok){
                        props.onDelete(review.id);
                    }
                })
            }
        }
    }

    return (
        <tr>
            <td style={{ border: 'none' }}>{new Date(review.date).toLocaleDateString('en-GB')}</td>
            <td style={{ border: 'none' }}>{review.content}</td>
            <td style={{ border: 'none' }}>{reviewer.userId}</td>
            <td style={{ border: 'none' }}>{review.rating}</td>
            <td style={{ border: 'none' }}><button className="btn_del" onClick={del_btn}>Del</button></td>
        </tr>
    );
}


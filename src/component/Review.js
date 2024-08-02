import useFetch from "../hooks/useFetch";

export default function Review(props) {
  const review = props.review;
  const reviewer = useFetch(`https://localhost:7230/api/User/${review.userId}`);

  return (
    <tr>
      <td style={{ border: "none" }}>{review.title}</td>
      <td style={{ border: "none" }}>{review.content}</td>
      <td style={{ border: "none" }}>{reviewer.userId}</td>
      <td style={{ border: "none" }}>{review.rating}</td>
    </tr>
  );
}

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <dev className="header">
      <h1>
        <Link to="/">WEB Recipe</Link>
      </h1>
      <dev className="menu">
        <Link to="/create_word" className="link">
          ADD RECIPE
        </Link>
        <Link to="/create_day" className="link">
          Day 추가
        </Link>
      </dev>
    </dev>
  );
}

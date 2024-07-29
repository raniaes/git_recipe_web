import User_Register from "./component/User_Register";
import Main from "./component/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<User_Register />}></Route>
          <Route path="/Main" element={<Main />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function Login(){
    const Navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault();

        fetch('https://localhost:7110/api/User/Login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: IdRef.current.value,
                password: PasswordRef.current.value,
            }),
        }).then(res =>{
            return res.json();
        }).then(data => {
            if (data.message === "Login successful"){
                alert(`welcome ${IdRef.current.value}`);
                console.log(data.id);
                Navigate('/RecipeList', {state: {Id : data.id}});
            }
        });
    }

    const IdRef = useRef(null);
    const PasswordRef = useRef(null);

    return <form onSubmit = {onSubmit}>
        <h2>Login</h2>
        <div className="input_area">
            <label>Id</label>
            <input type="text" placeholder="ID" ref={IdRef}/>
        </div>
        <div className="input_area">
            <label>Password</label>
            <input type="text" placeholder="Password" ref={PasswordRef}/>
        </div>
        <div>
            <button className="button_lgn">Login</button>
        </div>
        <div>
            <label>Do you want </label>
            <Link to="/Register" className="button_reg">Sign Up</Link>
            <label> ?</label>
        </div>
    </form>
}
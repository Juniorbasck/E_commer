import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../components/HeaderLogin";
import axios from "axios";

const Login = () => {
    window.scroll(0, 0);

    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [error, setError] = useState(null); 

    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("api/users/login", {
          email,
          password,
        });
  
        const { _id, name, token, createdAt } = response.data;
  
        localStorage.setItem("user", JSON.stringify({ _id, name, token, createdAt }));

        console.log("esotu aquiDADWDADWDADWDADWDAWAWD");
  
        window.location.href = "/"; 
  
      } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data?.message || "Erro desconhecido");

        setError("Credenciais inválidas. Por favor, verifique seu e-mail e senha.");
      }
    };

    return (
        <>
          <HeaderLogin />
          <div className="container d-flex flex-column justify-content-center align-items-center login-center">
            <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>

               {error && <p className="error-message">{error}</p>}

                <input type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                
                <input type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPasword(e.target.value)}/>

                <button type="submit">Entrar</button>
            </form>
          </div>
        </>
    );
};

export default Login; 
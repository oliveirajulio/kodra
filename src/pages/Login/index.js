import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import LoginCall from "../../services/service-login";
import "./index.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  

  function LoginBtn(email, password) {
    LoginCall(email, password)
      .then((token) => {
        console.log("Token recebido:", token); // Exibe o token no console
        localStorage.setItem('authToken', token); // Salva o token no localStorage para futuras requisições
        Swal.fire({
            position: 'bottom',
            title: 'Login successfully!', // O título da notificação
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            background: '#1ed760',
            color: '#fff',
            customClass: {
              popup: 'login-popup', // Classe customizada para o estilo
            },
            padding: '1px', // Adiciona padding para ajustar o espaçamento interno
          });
          setTimeout(() => {
            window.location.href = '/'; // Exemplo de redirecionamento
          }, 2000); // Exemplo de redirecionamento
      })
      .catch((error) => {
        console.error("Erro no login:", error); // Tratamento de erro adicional, se necessário
      });
  }

    function NewAcc () {
      window.location.href = '/signup'
    }


    useEffect(() => {
          // Update localStorage and document class when theme changes
          localStorage.setItem("theme", theme);
          document.documentElement.setAttribute('data-theme', theme);
        }, [theme]);

  return (
    <div className="container-login">

      <div className="intro-login">
        <h3> 
          <img className="isologo" src="/imagens/isologo.png"/>
            Kodra 
        </h3>  
        <button onClick={NewAcc} className="btn-register">Sign up</button>
      </div>

      <div className="box-login">

      <div className="logo">
        <img className="logo-img" src="/imagens/logo.png"/>
      </div>

        {/* <label className="lablog-email">Email address</label> */}
        <input
          className="iptlog-email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="pass-row">
          {/* <label className="lablog-pass">Password</label> */}
        </div>
        <input
          className="iptlog-pass"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => LoginBtn(email, password)} className="signin">
          Sign in
        </button>
        <button className="btn-fgt">Forgot password?</button>

          <div className="box-more">
          <a className="passkey">Sign with a passkey</a>
          <span className="sp-qst">New to? 
            <a onClick={NewAcc}>Create an account</a>
          </span>
        </div>
      </div>

    </div>
  );
}

export default Login;

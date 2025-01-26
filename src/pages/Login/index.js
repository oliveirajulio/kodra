import React, { useState } from "react";
import Swal from 'sweetalert2';

import LoginCall from "../../services/service-login";
import "./index.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className="container-login">
      <div className="intro-login">
        <h2 className="invite-login">Sign in to</h2>
      </div>

      <div className="box-login">
        <label className="lablog-email">Email address</label>
        <input
          className="iptlog-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="pass-row">
          <label className="lablog-pass">Password</label>
          <button className="btn-fgt">Forgot password?</button>
        </div>
        <input
          className="iptlog-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => LoginBtn(email, password)} className="signin">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;

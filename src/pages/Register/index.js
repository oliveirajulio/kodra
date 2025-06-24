import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import register from "../../services/service-register";
import "./index.css";

function Register () {
    // Definindo os estados para armazenar os valores dos inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    

    // Função para lidar com o envio dos dados
    const Register = async () => {
        console.log('Função handleRegister foi chamada');
        try {
            await register(username, email, password);
            Swal.fire({
                position: 'bottom',
                title: 'User registered successfully!', // O título da notificação
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                background: '#1ed760',
                color: '#fff',
                customClass: {
                    popup: 'register-alert', // Classe customizada para o estilo
                },
                padding: '1px', // Adiciona padding para ajustar o espaçamento interno
                });
                setTimeout(() => {
                    window.location.href = '/login'; // Exemplo de redirecionamento
                  }, 2000);
        } catch (error) {
            alert("Erro ao registrar usuário. Tente novamente.");
            console.error(error); // Isso ajuda a ver o erro detalhado no console
        }
      };
      

    return (
        <div className="container-signup">
            <div className="intro-signup">
                <img className="signup" src="/imagens/signup.png"/>
            </div>
            <div className="register">
                <h2 className="invite-signup">Create your account</h2>

                <label className="lab-email">Email</label>
                <input
                    className="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado do email
                />

                <label className="lab-pass">Password</label>
                <input
                    className="pass"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado da senha
                />
                <p className="warn-pass">
                    Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.
                </p>

                <label className="lab-username">Username</label>
                <input
                    className="username"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}  // Atualiza o estado do username
                />
                <p className="warn-pass">
                    Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
                </p>

                <button className="btn-signup" onClick={Register}>Register</button>
            </div>
        </div>
    );
}

export default Register;

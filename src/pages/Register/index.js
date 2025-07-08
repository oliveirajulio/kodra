import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import register from "../../services/service-register";
import checkEmailExists from "../../services/service-checkemail";
import "./index.css";
import { HealthAndSafety, PasswordSharp } from "@mui/icons-material";

function Register () {
    // Definindo os estados para armazenar os valores dos inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [PasswordError, setPasswordError] = useState(false)
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    

    // Função para lidar com o envio dos dados
    const Register = async () => {

        if (!isValidPassword(password)) {
    setPasswordError(true); // ativa o erro

    return; // impede o envio
}
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

      function isValidPassword(password) {
    const longEnough = password.length >= 15;
    const strongEnough = password.length >= 8 &&
                         /[a-z]/.test(password) &&
                         /\d/.test(password); // contém número
    return longEnough || strongEnough;
}

    function LoginAccess () {
        window.location.href = '/login'
    }

    
      function handleChange(e) {
        const newPass = e.target.value;
        setPassword(newPass);
        setPasswordError(!isValidPassword(newPass));
        }

        const handleEmailChange = async (e) => {
  const newEmail = e.target.value;
  setEmail(newEmail);
  setEmailTouched(true);

  try {
    const exists = await checkEmailExists(newEmail);
    setEmailExistsError(exists);
  } catch (err) {
    console.error("Erro ao verificar email:", err);
    setEmailExistsError(false); // assume que não existe em caso de erro
  }
};


    return (
        <div className="container-signup">
            <div className="intro-signup">
                    <img className="signup" src="/imagens/signup.png"/>
                <div/>
            </div>
            <div className="register">

                <div className="isologo-box">
                     <div className="image-intro">
                        <h3> 
                            <img className="isologo" src="/imagens/isologo.png"/>
                            Kodra Board
                        </h3>   
                    </div>

                    <div className="btn-intro-access">
                        <button onClick={LoginAccess} className="login-btn">Sign in</button>
                    </div>
                </div>

                <h2 className="invite-signup">Create your account</h2>

               <label className="lab-email">Email</label>
                <input
                    className={`email ${emailExistsError ? "input-error" : ""}`}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    />

                    {emailExistsError && emailTouched && (
                    <p className="warn-email error-shake">Email already exists</p>
                    )}

                <label className="lab-pass">Password</label>
                <input
                    className={`pass ${PasswordError ? "pass-error" : "" }`}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => handleChange(e)}  // Atualiza o estado da senha
                />
                <p
                    className={`warn-pass 
                        ${PasswordError ? "error-shake" : ""} 
                        ${isValidPassword(password) ? "valid-pass" : ""}
                    `}
                    >
                    Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.
                    </p>

                <label className="lab-username">Your Name</label>
                <input
                    className="username"
                    placeholder="What do you want to be called?"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}  // Atualiza o estado do username
                />
                

                <button className="btn-signup" onClick={Register}>Register</button>
            </div>
        </div>
    );
}

export default Register;

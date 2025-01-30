import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const isAuthenticated = localStorage.getItem('token'); // Verifica se o usuário está autenticado

function Router() {

    const isAuthenticated = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Register />}/>
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
            </Routes>    
        </BrowserRouter>

    )
}

export default Router;
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function Router() {

    const isAuthenticated = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Register />}/>
                <Route path="/plans" element={ <Plans />} />
                <Route path="/" element={ <Home /> } />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>    
        </BrowserRouter>

    )
}

export default Router;
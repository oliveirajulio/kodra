import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Register />}/>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>    
        </BrowserRouter>

    )
}

export default Router;
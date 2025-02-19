import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game, Home, Winner } from "./pages";

export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />}/>
            <Route path="/winner" element={<Winner />} />
        </Routes>
    </BrowserRouter>
);
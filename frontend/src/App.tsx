import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

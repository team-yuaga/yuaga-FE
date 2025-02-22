import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Main, Signin, Category, Detail, Posting } from "./pages";
import { OutLet } from "./outLet";
import { Mypage } from "./pages/mypage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OutLet />} >
                    <Route path="signin" element={<Signin />} />
                    <Route path="login" element={<Login />} />
                    <Route path="main" element={<Main />} />
                    <Route path="stylist" element={<Category />} />
                    <Route path="makeup" element={<Category />} />
                    <Route path="wishlist" element={<Category />} />
                    <Route path="stylist/:id" element={<Detail />} />
                    <Route path="makeup/:id" element={<Detail />} />
                    <Route path="wishlist/:id" element={<Detail />} />
                    <Route path="posting" element={<Posting />} />
                    <Route path="mypage" element={<Mypage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

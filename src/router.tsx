import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Main, Signin, Category, Detail, Posting, Mypage } from "./pages";
import { OutLet } from "./outLet";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OutLet />} >
                    <Route path="signin" element={<Signin />} />
                    <Route path="login" element={<Login />} />
                    <Route path="main" element={<Main />} />
                    <Route path=":category" element={<Category />} />
                    <Route path=":category/:id" element={<Detail />} />
                    <Route path="posting" element={<Posting />} />
                    <Route path="mypage" element={<Mypage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

import { useSearchParams } from "react-router-dom";
import { ProfilePage } from "../components/profile";
import { MypageNavbar } from "../components/MypageBar";

export const Mypage = () => {
    const [searchParams] = useSearchParams();
    const path = searchParams.get("tab") || "profile";

    console.log(path);

    return (
        <>
            <MypageNavbar />
            {path === "profile" ? <ProfilePage /> : ""}
        </>
    );
};

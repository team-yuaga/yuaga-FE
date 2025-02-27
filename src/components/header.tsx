import { styled } from "styled-components";
import { Logo, Profile } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import useUserName from "../stores/username";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routerList = ["style", "makeup", "wishlist"];
  const { userName } = useUserName()
  const isAuthPage = ["/login", "/signin"].includes(location.pathname);
  const isCategoryPage = routerList.some((route) =>
    location.pathname.includes(route)
  );

  console.log(isAuthPage, isCategoryPage)



  return (
    <HeaderContainer>
      <LogoImg src={Logo} onClick={() => navigate("/main")} />
      {!isAuthPage && (
        <>
          {isCategoryPage ? (
            <ProfileContainer onClick={() => navigate("/mypage?=profile")}>
              <img src={Profile} alt="Profile" width={35} height={35} />
              <p>{userName}</p>
            </ProfileContainer>
          ) : (
            <RouterContainer>
              {routerList.map((item) => (
                <p key={item} onClick={() => navigate(`/${item}`)}>
                  {item}
                </p>
              ))}
            </RouterContainer>)}
        </>
      )}
    </HeaderContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

const RouterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 44px;

  & > p {
    color: #1d1d1d;
    font-size: 20px;
    cursor: pointer;
  }
`;

const LogoImg = styled.img`
  cursor: pointer;
  background-color: ${({ theme }) => theme.brown["03"]};
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 16px 22px;
  background-color: ${({ theme }) => theme.brown["03"]};
  border-bottom: 1px solid ${({ theme }) => theme.brown["04"]};
`;

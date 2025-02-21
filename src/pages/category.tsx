import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import { Categorybar } from "../components/categorybar";
import { SearchInput } from "../components/searchInput";
import { Card } from "../components/Card";
import { useGetFeeds } from "../apis/feeds";
import { Button } from "../components/button";

export const Category = () => {
  const { data: feeds } = useGetFeeds();
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string>('스타일링')

  useEffect(() => {
    switch (location.pathname) {
      case "/makeup":
        setTabs(["모두", "봄웜", "여름쿨", "가을웜", "겨울쿨"]);
        setCategoryName('메이크업')
        break;
      case "/stylist":
        setTabs(["모두", "봄", "여름", "가을", "겨울"]);
        setCategoryName('스타일링')
        break;
      case "/wishlist":
        setTabs(["스타일", "메이크업"]);
        setCategoryName('게시물')
        break;
      default:
        setTabs([""]);
    }
  }, [location.pathname]);


  return (
    <Layouts>
      <Navbar />
      <Content>
        <TopBar>
          <Categorybar tabs={tabs} />
          <SearchInput placeholder={`원하는 ${categoryName}을 검색해보세요`} name="" onChange={() => { }} value="" />
        </TopBar>
        <CardList>
          {
            feeds?.map((item) => (
              <Card
                onClick={() => navigate(`/${location.pathname.split('/')[1]}/${item.feed_id}`)}
                key={item.feed_id}
                title={item.title}
                hashtag={item.tags}
                date={item.created_at}
                image="https://source.unsplash.com/random"
              />
            ))
          }
        </CardList>
        {feeds?.length === 0 && <NotHaveDataContent>
          <Title>아직 {categoryName === "게시물" ? '즐겨찾기한' : '등록된'} 게시물이 없습니다</Title>
          <Button onClick={() => { categoryName === "게시물" ? navigate('/stylist') : navigate('/posting') }} width="306">{categoryName === "게시물" ? "게시물 보러가기" : `${categoryName} 추가하러 가기`}</Button>
        </NotHaveDataContent>}
      </Content>
    </Layouts>
  );
};

const Layouts = styled.div`
  padding-top: 74px;
`;

const Content = styled.div`
min-height: 100vh;
  background-color: ${({ theme }) => theme.brown["01"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
  gap: 20px;
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 42px;
  margin-bottom: 36px;
`;

const NotHaveDataContent = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
  margin:auto;
  gap: 32px;
`

const Title = styled.p`
  font-size: 30px;
  color: ${({ theme }) => theme.brown['04']};
`
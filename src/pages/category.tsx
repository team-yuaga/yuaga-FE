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
  const [categoryName, setCategoryName] = useState<string>('스타일');
  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    let newTabs: string[] = [];
    let newCategoryName = "스타일";

    switch (location.pathname) {
      case "/makeup":
        newTabs = ["모두", "봄웜", "여름쿨", "가을웜", "겨울쿨"];
        newCategoryName = "메이크업";
        break;
      case "/style":
        newTabs = ["모두", "봄", "여름", "가을", "겨울"];
        newCategoryName = "스타일";
        break;
      case "/wishlist":
        newTabs = ["스타일", "메이크업"];
        newCategoryName = "게시물";
        break;
      default:
        newTabs = [""];
    }

    setTabs(newTabs);
    setCategoryName(newCategoryName);
    setSelectedTab(newTabs[0] || "모두");
  }, [location.pathname]);

  const filteredFeeds = feeds?.filter(item => {
    const isCategoryMatch = item.cate_gory === categoryName;
    const isSeasonMatch = selectedTab === "모두" || item.season === selectedTab;
    return isCategoryMatch && isSeasonMatch;
  }) || [];

  const wishlist = feeds?.filter(item => {
    const isWishlist = location.pathname === "/wishlist";
    const isLike = isWishlist ? item.like_boolean : true;
    const category = item.cate_gory === selectedTab
    return isLike && category
  }) || []


  return (
    <>
      <Navbar />
      <Layouts>
        <Content>
          <TopBar>
            <Categorybar
              tabs={tabs}
              onTabChange={(tab: string) => setSelectedTab(tab)}
            />
            <SearchInput placeholder={`원하는 ${categoryName}을 검색해보세요`} name="" onChange={() => { }} value="" />
          </TopBar>
          <CardList>
            {filteredFeeds.map(item => (
              <Card
                onClick={() => navigate(`/${location.pathname.split('/')[1]}/${item.feed_id}`)}
                key={item.feed_id}
                title={item.title}
                hashtag={item.tags}
                date={item.created_at}
                heart_boolean={item.like_boolean}
                image="https://source.unsplash.com/random"
              />
            ))}
            {
              location.pathname === '/wishlist' && feeds?.filter(item => item.like_boolean === true && item.cate_gory === selectedTab).map((item) => (
                <Card
                  onClick={() => navigate(`/${location.pathname.split('/')[1]}/${item.feed_id}`)}
                  key={item.feed_id}
                  title={item.title}
                  hashtag={item.tags}
                  date={item.created_at}
                  heart_boolean={item.like_boolean}
                  image="https://source.unsplash.com/random"
                />
              ))
            }
          </CardList>

          {filteredFeeds.length === 0 && wishlist.length === 0 && (
            <NotHaveDataContent>
              <Title>아직 {categoryName === "게시물" ? '즐겨찾기한' : '등록된'} 게시물이 없습니다</Title>
              <Button
                onClick={() => { categoryName === "게시물" ? navigate('/style') : navigate('/posting') }}
                width="306"
              >
                {categoryName === "게시물" ? "게시물 보러가기" : `${categoryName} 추가하러 가기`}
              </Button>
            </NotHaveDataContent>
          )}
        </Content>
      </Layouts>
    </>
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
  padding-top: 100px;
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
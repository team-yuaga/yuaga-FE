import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import { Categorybar } from "../components/categorybar";
import { SearchInput } from "../components/searchInput";
import { Card } from "../components/Card";

export const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<string[]>([]);

  useEffect(() => {
    switch (location.pathname) {
      case "/makeup":
        setTabs(["모두", "봄웜", "여름쿨", "가을웜", "겨울쿨"]);
        break;
      case "/stylist":
        setTabs(["모두", "봄", "여름", "가을", "겨울"]);
        break;
      case "/wishlist":
        setTabs(["스타일", "메이크업"]);
        break;
      default:
        setTabs([""]);
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Navbar />
      <Content>
        <TopBar>
          <Categorybar tabs={tabs} />
          <SearchInput placeholder="메이크업을 검색해보세요" name="" onChange={() => { }} value="" />
        </TopBar>
        <CardList>
          {Array(7)
            .fill(null)
            .map((_, index) => (
              <Card
                onClick={() => navigate(`./${index}`)}
                key={index}
                title="title"
                hashtag={["tag1", "tag2", "tag3"]}
                date="2021-09-01"
                image="https://source.unsplash.com/random"
              />
            ))}
        </CardList>
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 74px;
`;

const Content = styled.div`
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

import React from "react";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import { mainfirst, mainsecond } from "../assets";

const items = [
  "Jacket.png", "bag.png", "bag2.png", "onePiece.png", "cap.png",
  "shoes.png", "bag3.png", "pin.png", "glasses.png", "shorts.png",
  "Shoes2.png", "Shoes2.png", "Shoes2.png", "bracelet.png", "bag2.png",
  "jersey.png", "clip.png", "shoes3.png", "watch.png", "ring.png",
  "shoes4.png", " e3.[png"
];

export const Main = () => {
  return (
    <>
      <Container>
        <Navbar />
        {/* <GridContainer>
          {items.slice(0, 10).map((item, index) => (
            <Item key={index}>
              <img src={`/src/assets/mainImg/${item}`} alt="item" />
            </Item>
          ))}
          <CenterText>
            <Subtitle>취향을 만나는 곳</Subtitle>
            <Title>YUAGA</Title>
            <Subtitle>지금 딱 나만의 취향을 찾을 시간</Subtitle>
          </CenterText>
          {items.slice(10).map((item, index) => (
            <Item key={index + 10}>
              <img src={`/src/assets/mainImg/${item}`} alt="item" />
            </Item>
          ))}
        </GridContainer> */}
        <img src={mainsecond} width="100%" />
        <img src={mainfirst} alt="" width="100%" />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f0eb;
  min-height: 100vh;
  padding-top: 72px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 12px;
  margin-top: 20px;
`;

const Item = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 208px;
  height: 208px;
  img {
    width: 150px;
    height: auto;
  }
`;

const CenterText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 3 / span 3;
  grid-row: 2 / span 2;
  background: white;
   border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  margin: 10px 0;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #555;
`;
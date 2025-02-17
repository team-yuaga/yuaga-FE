import styled from "styled-components";
import { Back, Heart, HeartFill, LeftArrow, RightArrow } from "../assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Detail = () => {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        "https://source.unsplash.com/random/800x600",
        "https://source.unsplash.com/random/801x601",
        "https://source.unsplash.com/random/802x602"
    ];

    const changeImage = (direction: "prev" | "next") => {
        setCurrentImageIndex(prev =>
            direction === "prev" ? (prev === 0 ? images.length - 1 : prev - 1) : (prev === images.length - 1 ? 0 : prev + 1)
        );
    };

    const handleDotClick = (index: number) => setCurrentImageIndex(index);
    const toggleLike = () => setIsLiked(prev => !prev);

    return (
        <DetailContainer>
            <BackButton src={Back} onClick={() => navigate(-1)} />
            <Line />
            <ContentWrap>
                <DetailContentWrap>
                    <ImgWrap>
                        <Slider>
                            <ArrowButton onClick={() => changeImage("prev")}>
                                <img src={LeftArrow} alt="Previous" />
                            </ArrowButton>
                            <DetailImage src={images[currentImageIndex]} />
                            <ArrowButton onClick={() => changeImage("next")}>
                                <img src={RightArrow} alt="Next" />
                            </ArrowButton>
                        </Slider>
                        <DotsWrapper>
                            {images.map((_, index) => (
                                <Dot key={index} onClick={() => handleDotClick(index)} isActive={index === currentImageIndex} />
                            ))}
                        </DotsWrapper>
                    </ImgWrap>
                </DetailContentWrap>
                <DetailContentWrap>
                    <DetailContentTop>
                        <DetailTitle>제품명</DetailTitle>
                        <HeartButton onClick={toggleLike}>
                            <img src={isLiked ? HeartFill : Heart} alt="Like" />
                        </HeartButton>
                    </DetailContentTop>
                    <DetailPrice>설명</DetailPrice>
                    <DetailDescription>태그</DetailDescription>
                    <DetailButton>계절</DetailButton>
                    <Link href="https://www.naver.com">
                        <LinkTitle>네이버로 이동</LinkTitle>
                        <LinkDescription>fjweofjoiqwjefo</LinkDescription>
                    </Link>
                </DetailContentWrap>
            </ContentWrap>
        </DetailContainer>
    );
};

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-top: 74px;
    background-color: ${({ theme }) => theme.brown['01']};
`;

const ContentWrap = styled.div`
    display: flex;
    margin-top: 16px;
    gap: 60px;
`;

const BackButton = styled.img`
    cursor: pointer;
    padding: 22px 16px;
    align-self: flex-start;
`;

const DetailContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 40px;
    min-width: 500px;
`;

const ImgWrap = styled.div`
    width: 776px;
    height: 819px;
    position: relative;
`;

const ArrowButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s ease;

    &:first-child { left: 10px; }
    &:last-child { right: 10px; }
`;

const Slider = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 776px;
    height: 819px;

    &:hover ${ArrowButton} { opacity: 1; }
`;

const DotsWrapper = styled.div`
    position: absolute;
    display: flex;
    gap: 8px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
`;

const Dot = styled.div<{ isActive: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #d9d9d9;
    opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
    cursor: pointer;
`;

const Line = styled.div`
    width: 1336px;
    min-height: 2px;
    background-color: ${({ theme }) => theme.brown['04']};
    z-index: 1;
    position: relative;
    margin-top: 38px;
`;

const DetailImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    border-radius: 12px;
`;

const DetailContentTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 40px;
`;

const DetailTitle = styled.h1` font-size: 24px; `;
const DetailPrice = styled.p` font-size: 20px; `;
const DetailDescription = styled.p` font-size: 16px; `;

const HeartButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
`;

const DetailButton = styled.div`
    width: 80px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.brown['04']};
    border-radius: 20px;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.brown['04']};
`;

const Link = styled.a`
    width: 235px;
    height: 93px;
    padding: 20px 14px;
    color: ${({ theme }) => theme.black};
    text-decoration: none;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.brown['04']};
    border-radius: 5px;
    margin-top: 20px;
`;

const LinkTitle = styled.h1` font-size: 20px; `;
const LinkDescription = styled.p` font-size: 16px; margin-left: 8px; margin-top: 8px; `;

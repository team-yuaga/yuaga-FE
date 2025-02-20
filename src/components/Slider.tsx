import React, { useState, useRef } from "react";
import styled from "styled-components";
import { LeftArrow, RightArrow } from "../assets";

export const CustomSlider = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const goToNextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            goToNextSlide();
        } else if (touchEndX.current - touchStartX.current > 50) {
            goToPrevSlide();
        }
    };

    return (
        <SliderWrapper>
            <SliderContent
                ref={sliderRef}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {images.map((img, index) => (
                    <Slide key={index}>
                        <ImgD src={img} alt={`Uploaded ${index}`} />
                    </Slide>
                ))}
            </SliderContent>
            <NavButton className="prev" onClick={goToPrevSlide}>
                <img src={LeftArrow} alt="" style={{ width: '50px', height: '50px' }} />
            </NavButton>
            <NavButton className="next" onClick={goToNextSlide}>
                <img src={RightArrow} alt="" style={{ width: '50px', height: '50px' }} />
            </NavButton>
            <Dots>
                {images.map((_, index) => (
                    <Dot key={index} active={currentIndex === index} onClick={() => setCurrentIndex(index)} />
                ))}
            </Dots>
        </SliderWrapper>
    );
};


export const SliderWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 482px;
    height: 509px;
`;

export const SliderContent = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
`;

export const Slide = styled.div`
   min-width: 482px;
    max-height: 509px;
    position: relative;
`;

export const ImgD = styled.img`
    min-width: 100%;
    max-width: 100%;
    max-height: 509px;
    min-height: 509px;
    border-radius: 8px;
`;

export const Button = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 18px;
`;

export const NavButton = styled.button`
    position: absolute;
    top: 45%;
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 20px;
    background-color: transparent;

    &.prev { left: 10px; }
    &.next { right: 10px; }
`;

export const Dots = styled.div`
    position: absolute;
    bottom: 20px; 
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 100%;
`;

export const Dot = styled.span<{ active: boolean }>`
    height: 10px;
    width: 10px;
    margin: 0 8px;
    background-color: ${({ active }) => (active ? "#f0f0f0" : "#d9d9d9")};
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    transition: background-color 0.3s;
`;

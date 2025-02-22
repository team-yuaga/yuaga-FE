import { useState } from "react";
import styled from "styled-components";
import type { PersonalColorType } from "../apis/users/type";

interface PersonalColorProps {
    defaultColor?: PersonalColorType;
    onChange: (value: PersonalColorType) => void;
}

export const PersonalColor = ({ defaultColor = '봄웜', onChange }: PersonalColorProps) => {
    const [activeTab, setActiveTab] = useState<PersonalColorType>(defaultColor);

    const personalColorName: PersonalColorType[] = ["봄웜", "여름쿨", "가을웜", "겨울쿨"];
    const color = [
        ["DF4F34", "E27A33", "E6C739", "97C526"],
        ["BF4A29", "CB6C36", "D4B936", "538139"],
        ["A91A46", "B64178", "247E87", "48398C"],
        ["CD699D", "45A19C", "376099", "6D4E91"]
    ]

    return (
        <Container>
            <ButtonContainer>
                {personalColorName.map((item) => (
                    <Button
                        key={item}
                        $isActive={activeTab === item}
                        onClick={() => {
                            setActiveTab(item);
                            onChange(item);
                        }}
                    >
                        {item}
                    </Button>
                ))}
            </ButtonContainer>

            <ColorGrid>
                {personalColorName.map((name, rowIndex) => (
                    <ColorRow key={name}>
                        {color[rowIndex].map((hex) => (
                            <ColorBox key={hex} style={{ backgroundColor: `#${hex}` }} />
                        ))}
                    </ColorRow>
                ))}
            </ColorGrid>
        </Container>
    );
};

const Container = styled.div`
display: flex;
align-items: center;
gap: 20px;
margin-left: 54px;
;`

const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
gap: 28px;
;`

const Button = styled.button<{ $isActive: boolean }>`
border: 1px solid ${({ theme }) => theme.brown["04"]};
background-color: ${({ theme, $isActive }) => ($isActive ? theme.brown["04"] : theme.white)};
color: ${({ theme, $isActive }) => ($isActive ? theme.white : theme.brown["04"])};
border-radius: 20px;
cursor: pointer;
width: 80px;
height: 28px;
display: flex;
justify-content: center;
align-items: center;
font-size: 14px;
;`

const ColorGrid = styled.div`
display: flex;
flex-direction: column;
gap: 28px;
;`

const ColorRow = styled.div`
display: flex;
gap: 16px;
;`

const ColorBox = styled.div`
width: 29px;
height: 29px;
border-radius: 50%;
;`
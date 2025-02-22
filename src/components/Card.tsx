import styled from "styled-components"
import { Heart, HeartFill } from "../assets"

interface CardProps {
    title: string
    hashtag: string[]
    date: string
    image: string
    onClick: () => void
    heart_boolean: boolean
}

export const Card = ({ title, hashtag, date, image, onClick, heart_boolean }: CardProps) => {
    return (
        <CardStyle onClick={onClick}>
            <Image src={image} alt="card image" />
            <InfoWrapper>
                <div>
                    <Title>{title}</Title>
                    <HashTagList>
                        {hashtag.map((tag, index) => <HashTag key={index}>#{tag}</HashTag>)}
                    </HashTagList>
                    <Date>{date}</Date>
                </div>
                <img src={heart_boolean ? HeartFill : Heart} alt="card image" width={38} height={38} />
            </InfoWrapper>
        </CardStyle>
    )
}

const CardStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`
const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
`
const HashTagList = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
`
const HashTag = styled.p` 
    font-size: 17px;
    color: ${({ theme }) => theme.gray['01']};
`
const Image = styled.img`
    width: 269px;
    height: 285px;
    object-fit: cover;
    background-color: ${({ theme }) => theme.gray['02']};
    border-radius: 6px;
`

const Date = styled.p`
    font-size: 12px;
    color: #9E9E9E;
    margin-bottom: 10px;
`


const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
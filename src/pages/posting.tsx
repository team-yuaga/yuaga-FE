import styled from "styled-components";
import { Back, Union } from "../assets";
import { useState } from "react";
import { CustomSlider } from "../components/Slider";
import { TagInputComponent } from "../components/tagInput";
import { CustomRadioComponent } from "../components/radio";
import { TitleInput } from "../components/titleInput";
import { TextareaComponent } from "../components/textarea";
import { Button } from "../components/button";
import type { FeedPostRequest } from "../apis/feeds/type";
import { useFeedPost } from "../apis/feeds";
import { useNavigate } from "react-router-dom";

export const Posting = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<FeedPostRequest>({
        feed_local: '스타일',
        title: '',
        content: '',
        tags: [],
        season: ''
    });

    const [tagInput, setTagInput] = useState("");
    const { mutate: PostFeed } = useFeedPost();

    const seasons = data.feed_local === "스타일"
        ? ['봄', '여름', '가을', '겨울']
        : ['봄웜', '여름쿨', '가을웜', '겨울쿨'];

    // const handleRemoveImage = (index: number) => {
    //     setData(prevData => ({
    //         ...prevData,
    //         file_name: prevData.file_name.filter((_, i) => i !== index),
    //     }));
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     if (files) {
    //         const fileArray = Array.from(files);
    //         if (data.file_name.length + fileArray.length > 10) {
    //             alert("사진은 최대 10장까지 추가할 수 있습니다.");
    //             return;
    //         }
    //         setData(prevData => ({
    //             ...prevData,
    //             file_name: prevData.file_name.concat(fileArray.map(file => URL.createObjectURL(file))),
    //         }));
    //     }
    // };

    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value);

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            if (data.tags.length >= 4) {
                alert("태그는 최대 4개까지 추가할 수 있습니다.");
                return;
            }
            setData(prevData => ({
                ...prevData,
                tags: [...prevData.tags, tagInput.trim()]
            }));
            setTagInput("");
        }
    };

    const handleRemoveTag = (index: number) => {
        setData(prevData => ({
            ...prevData,
            tags: prevData.tags.filter((_, i) => i !== index),
        }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({
            ...prevData,
            feed_local: e.target.value as '스타일' | '메이크업',
        }));
    };

    const handleSeasonChange = (season: string) => {
        setData(prevData => ({
            ...prevData,
            season,
        }));
    };

    const handleSubmit = () => {
        if (!data.title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!data.content.trim()) {
            alert("게시물 내용을 입력해주세요.");
            return;
        }
        PostFeed(data, {
            onSuccess: () => {
                navigate('/stylis')
            }
        });
    };

    <Button width="480" onClick={handleSubmit}>게시물 추가</Button>

    return (
        <Container>
            <BackImg onClick={() => navigate(-1)} src={Back} alt="back" />
            <Content>
                {/* <div>
                    {data.file_name.length === 0 ? (
                        <Img htmlFor="file-input">
                            <img src={Union} alt="upload icon" />
                            <p>사진은 최대 10장 추가가 가능합니다.</p>
                        </Img>
                    ) : (
                        <SliderContainer>
                            <CustomSlider images={data.file_name} />
                        </SliderContainer>
                    )}
                    {data.file_name.length > 0 && (
                        <ImageList>
                            {data.file_name.map((img, index) => (
                                <ImageItem key={index}>
                                    <ImgThumbnail src={img} alt={`Uploaded ${index}`} />
                                    <RemoveButton onClick={() => handleRemoveImage(index)}>&times;</RemoveButton>
                                </ImageItem>
                            ))}
                            {data.file_name.length < 10 && (
                                <AddImageButton onClick={() => document.getElementById("file-input")?.click()}>
                                    +
                                </AddImageButton>
                            )}
                        </ImageList>
                    )}
                    <ImgUpload onChange={handleFileUpload} type="file" id="file-input" multiple accept="image/*" />
                </div> */}
                <RightSection>
                    <ContentWrap>
                        <Title>공유할 게시물의 위치 *</Title>
                        <RadioContainer>
                            <CustomRadioComponent
                                name="feed_local"
                                id="style"
                                label="스타일"
                                value="스타일"
                                checked={data.feed_local === '스타일'}
                                onChange={handleRadioChange}
                            />
                            <CustomRadioComponent
                                name="feed_local"
                                id="makeup"
                                label="메이크업"
                                value="메이크업"
                                checked={data.feed_local === '메이크업'}
                                onChange={handleRadioChange}
                            />
                        </RadioContainer>
                    </ContentWrap>
                    <ContentWrap>
                        <Title>제목 *</Title>
                        <TitleInput onChange={handleChange} value={data.title} name="title" /></ContentWrap>
                    <ContentWrap>
                        <Title>태그</Title>
                        <TagInputComponent
                            onClick={() => {
                                setData(prevData => ({
                                    ...prevData,
                                    tags: [...prevData.tags, tagInput.trim()]
                                }));
                                setTagInput("");
                            }}
                            value={tagInput}
                            onChange={handleTagInput}
                            onKeyPress={handleTagKeyPress}
                            data={data.tags}
                            handleRemoveTag={handleRemoveTag}
                        />
                    </ContentWrap>
                    <div>
                        <Title>게시물 설명</Title>
                        <TextareaComponent onChange={handleChange} name="content" value={data.content} />
                    </div>
                    <div>
                        <Title>{data.feed_local === "스타일" ? "계절" : '메이크업'}</Title>
                        <SeasonContainer>
                            {seasons.map((item) => (
                                <SeasonButton
                                    onClick={() => handleSeasonChange(item)}
                                    key={item}
                                    selected={data.season === item}
                                >
                                    {item}
                                </SeasonButton>
                            ))}
                        </SeasonContainer>
                    </div>
                    <ButtonPosition>
                        <Button width="480" onClick={handleSubmit} >게시물 추가</Button>
                    </ButtonPosition>
                </RightSection>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    padding: 94px 0;
    background-color: ${({ theme }) => theme.brown['03']};
    display: flex;
    flex-direction: column;
`;

const SeasonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

const SeasonButton = styled.button<{ selected: boolean }>`
    width: 109px;
    text-align: center;
    padding: 7px;
    border-radius: 20px;
    background-color: white;
    border: 1.5px solid ${({ theme, selected }) => selected ? theme.brown['04'] : "white"};
    cursor: pointer;
`;

const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 72px;
`;

const Content = styled.div`
    display: flex;
    gap:96px;
    margin: 60px auto;
`;

const BackImg = styled.img`
    cursor: pointer;
    width: 44px;
    height: 44px;
    background-color: ${({ theme }) => theme.brown['03']};
    align-self: flex-start;
    margin-left: 16px;
`;

const SliderContainer = styled.div`
    width: 100%;
`;

const Img = styled.label`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 32px;
    justify-content: center;
    gap: 36px;
    align-items: center;
    width: 482px;
    height: 509px;
    border-radius: 17px;
    color: ${({ theme }) => theme.gray['01']};
    background-color: ${({ theme }) => theme.gray['02']};
`;

const ButtonPosition = styled.div`
    display:flex;
    justify-content: end;
`

const ImgUpload = styled.input`
    display: none;
`;

const ImageList = styled.div`
    width: max-content;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    margin: 20px auto;
`;

const ImageItem = styled.div`
    position: relative;
`;

const ImgThumbnail = styled.img`
    width: 71px;
    height: 81px;
    object-fit: cover;
    border-radius: 8px;
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: ${({ theme }) => theme.red};
    color: white;
    border: none;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    cursor: pointer;
    font-size: 16px;
`;

const AddImageButton = styled.button`
    background-color: ${({ theme }) => theme.gray['02']};
    color: ${({ theme }) => theme.gray['01']};
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 71px;
    height: 81px;
`;

const RadioContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`;

const ContentWrap = styled.div`
    display:flex;
    gap: 64px;
    width: 100%;
`

const Title = styled.p`
    font-size: 25px;
    white-space:nowrap;
`
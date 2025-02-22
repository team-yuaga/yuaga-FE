import styled from "styled-components";
import { useEffect, useState } from "react";
import { LogoutIcon, PencilIcon, Profile } from "../assets";
import { InfomationInput } from "./infomationInput";
import { PersonalColor } from "./personalColor";
import { useGetInfomation, useModifyNickname, useSubmituserInfo } from "../apis/users";
import type { PersonalColorType, UserInformationResponseType } from "../apis/users/type";

export const ProfilePage = () => {
    const { data: userData, isLoading } = useGetInfomation();
    const { mutate: modifyNicknameMutate } = useModifyNickname();
    const { mutate: SubmitUserInfo } = useSubmituserInfo();
    const [modifyNickname, setModifyNickname] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);
    const [data, setData] = useState<UserInformationResponseType>({
        nick_name: "",
        height: null,
        weight: null,
        skin: null,
        style: null,
        user_personal_color: null
    });

    useEffect(() => {
        if (userData) {
            setData({
                nick_name: userData.nick_name || "",
                height: userData.height ?? null,
                weight: userData.weight ?? null,
                skin: userData.skin ?? null,
                style: userData.style ?? null,
                user_personal_color: userData.user_personal_color ?? null,
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleColorChange = (color: PersonalColorType) => {
        setData((prevData) => ({
            ...prevData,
            user_personal_color: color,
        }));
    };


    if (isLoading) return <p>로딩 중...</p>;

    return (
        <Container>
            <ProfileContainer>
                <img src={Profile} width={135} alt="프로필 사진" />
                <ModifyNicknameContent>
                    <p>닉네임</p>
                    <Flexbox>
                        <NicknameInput name="nick_name" onChange={handleChange} value={data.nick_name} defaultValue={userData?.nick_name} />
                        {modifyNickname ? (
                            <NickNameButton $disabled={false} onClick={() => modifyNicknameMutate(data.nick_name)}>저장</NickNameButton>
                        ) : (
                            <img
                                src={PencilIcon}
                                alt="닉네임 수정"
                                style={{ cursor: "pointer" }}
                                onClick={() => setModifyNickname(true)}
                            />
                        )}
                    </Flexbox>
                </ModifyNicknameContent>
                <LogoutContainer onClick={() => setLogout(true)}>
                    <Logout>로그아웃</Logout>
                    <img src={LogoutIcon} alt="로그아웃" />
                </LogoutContainer>
            </ProfileContainer>
            <Infomation>
                <InfomationContainer>
                    <p>스펙</p>
                    <InfomationInputContent>
                        <p>키</p>
                        <InfomationInput onChange={handleChange} width="370" value={data.height!} name="height" subTitle="cm" />
                    </InfomationInputContent>
                    <InfomationInputContent>
                        <p>몸무게</p>
                        <InfomationInput onChange={handleChange} width="370" value={data.weight!} name="weight" subTitle="kg" />
                    </InfomationInputContent>
                </InfomationContainer>
                <InfomationContainer>
                    <p>퍼스널컬러</p>
                    <PersonalColor onChange={handleColorChange} defaultColor={data.user_personal_color} />
                </InfomationContainer>
                <Flex>
                    <p>피부</p>
                    <Textarea onChange={handleChange} name="skin" defaultValue={data.skin || ""} />
                </Flex>
                <Flex>
                    <p>선호하는 스타일</p>
                    <Textarea onChange={handleChange} name="style" defaultValue={data.style || ""} />
                </Flex>
                <div></div>
                <SaveButtonContainer>
                    <SaveButton
                        $disabled={false}
                        onClick={() => {
                            const { nick_name, ...userInfo } = data;
                            SubmitUserInfo({ ...userInfo });
                        }}
                    >
                        저장하기
                    </SaveButton>
                </SaveButtonContainer>
            </Infomation>
        </Container>
    );
};

const Container = styled.div`
    display:flex;
    justify-content: center;
    gap: 72px;
    padding: 70px 0;
    margin: auto; 
    background-color: ${({ theme }) => theme.brown['01']};
    margin-top: 134px
`

const InfomationContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap:44px;
`

const Flex = styled.div`
    display: flex;
    width: 460px;
    justify-content: space-between;
`

const ProfileContainer = styled.div`
    display:flex;
    flex-direction: column;
    height: fit-content;
    align-items: center;
    background-color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.brown['02']};
    border-radius: 10px;
    padding: 30px 16px;
    width: fit-content;
`

const ModifyNicknameContent = styled.div`
    display: flex;
    align-items: center;
    gap: 28px;
    margin-top: 60px;
`

const Flexbox = styled.div`
    display: flex;
`

const NicknameInput = styled.input`
    outline:none;
    background:none;
    border-bottom: 1px solid ${({ theme }) => theme.brown['02']};
    padding: 8px 0px;
`

const NickNameButton = styled.button<{ $disabled: boolean }>`
    border: 1px solid ${({ theme }) => theme.brown['04']};
    padding: 5px 19px;
    border-radius: 20px;
    font-size: 10px;
    color: ${({ theme, $disabled }) => $disabled ? theme.brown['04'] : theme.white};
    background-color: ${({ theme, $disabled }) => $disabled ? theme.white : theme.brown['04']};
    cursor: pointer;
`

const Logout = styled.p`
    color: ${({ theme }) => theme.gray['02']};
`

const LogoutContainer = styled.div`
    display: flex;
    align-self: end;
    gap:12px;
    cursor: pointer;
    align-items:center;
    margin-top: 50px;
`

const Infomation = styled.div`
    display: grid;
    column-gap: 75px;
    row-gap: 112px;
    grid-template-columns: repeat(2, 1fr);
    padding: 64px 100px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.brown['02']};
`

const InfomationInputContent = styled.div`
    display: flex;
    width: 440px;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
`
const Textarea = styled.textarea`
    resize: none;
    width: 300px;
    height: 200px;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.brown['04']};
    border-radius: 5px;
    outline: none;
`
const SaveButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const SaveButton = styled.button<{ $disabled: boolean }>`
    background-color: ${({ theme, $disabled }) => ($disabled ? theme.white : theme.brown["04"])};
    color: ${({ theme, $disabled }) => ($disabled ? theme.brown["04"] : theme.white)};
    cursor: pointer;
    border-radius: 5px;
    padding: 5px 20px;
    width: fit-content;
    display: flex;
`;

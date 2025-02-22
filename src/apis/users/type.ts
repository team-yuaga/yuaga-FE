export interface SigninRequestType {
    accountId: string,
    password: string,
    checkPassword: string,
    nickname: string,
}

export interface LoginRequestType {
    accountId: string,
    password: string
}

export type PersonalColorType = "봄웜" | "여름쿨" | "가을웜" | "겨울쿨" | null;

export interface UserInformationResponseType {
    nick_name: string;
    height: number | null;
    weight: number | null;
    skin: string | null;
    style: string | null;
    user_personal_color: PersonalColorType;
}

export interface useSubmituserInfoRequestType {
    height: number | null,
    weight: number | null,
    skin: string | null,
    style: string | null,
    user_personal_color: PersonalColorType
}
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { LoginRequestType, SigninRequestType, UserInformationResponseType, useSubmituserInfoRequestType } from "./type";
import { instance } from "..";
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const router = "/users";

export const useSignin = () => {
    return useMutation({
        mutationFn: async (data: SigninRequestType) => {
            return await axios.post(`${BASE_URL}${router}/signup`, data);
        },
    })
}

export const UseLogin = () => {
    return useMutation({
        mutationFn: async (req: LoginRequestType) => {
            const { data } = await axios.post<{ access_token: string; refresh_token: string }>(
                `${BASE_URL}${router}/signin`,
                req
            );

            return data;
        }
    });
};

export const useGetInfomation = () => {
    return useQuery<UserInformationResponseType>({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const { data } = await instance.get<UserInformationResponseType>(`${router}/user`);
            return data;
        },
    });
};

export const useModifyNickname = () => {
    return useMutation({
        mutationFn: (nickname: string) => instance.patch(`${router}/nickname`, {
            "nickname": nickname
        })
    })
}

export const useSubmituserInfo = () => {
    return useMutation({
        mutationFn: (data: useSubmituserInfoRequestType) => instance.patch(`${router}/information`, data)
    })
}
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { LoginRequestType, SigninRequestType } from "./type";
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

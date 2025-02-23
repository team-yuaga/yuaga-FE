import { useMutation, useQuery } from "@tanstack/react-query"
import { instance } from ".."
import type { FeedDetailResponse, FeedPostRequest, FeedResponse } from "./type"

const router = '/feeds'

export const useFeedPost = () => {
    return useMutation({
        mutationFn: async (data: FeedPostRequest) => {
            try {
                await instance.post(`${router}`, data);
            } catch (error) {
                console.error("Error posting feed:", error);
                throw error;
            }
        },
        onError: (error) => {
            alert("게시물 등록에 실패했습니다. 다시 시도해주세요.");
            console.error("Mutation error:", error);
        },
    });
};

export const useGetFeeds = () => {
    return useQuery({
        queryKey: ['feeds'],
        queryFn: async () => {
            try {
                const { data } = await instance.get<FeedResponse[]>(`${router}`);
                return data;
            } catch (error) {
                console.error("Error fetching feeds:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetFeedDetail = (feedid: string) => {
    return useQuery({
        queryKey: [feedid],
        queryFn: async () => {
            try {
                const { data } = await instance.get<FeedDetailResponse>(`${router}/${feedid}`);
                return data
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    })
}

export const useGetCategoryFeed = (category: string) => {
    return useQuery({
        queryKey: [],
        queryFn: async () => {
            const { data } = await instance.get<FeedResponse[]>(`${router}/query?category=${category.toUpperCase()}`)
            return data
        }
    })
}
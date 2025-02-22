import { useMutation } from "@tanstack/react-query"
import { instance } from ".."

const router = '/likes'

export const useAddLike = () => {
    return useMutation({
        mutationFn: (feedId: number) => {
            return instance.post(`${router}/${feedId}`)
        }
    })
}

export const useDeleteLike = () => {
    return useMutation({
        mutationFn: (feedId: number) => {
            return instance.delete(`${router}/${feedId}`)
        }
    })
}
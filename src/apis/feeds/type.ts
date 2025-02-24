export interface FeedPostRequest {
    feed_local: '스타일' | '메이크업';
    title: string;
    content: string;
    //file:string[]
    tags: string[];
    season: string;
    type: string,
    product_name: string,
    purchase_url: string
}

export interface FeedResponse {
    feed_id: number,
    title: string,
    tags: string[],
    created_at: string,
    like_boolean: boolean,
    cate_gory: '스타일' | '메이크업',
    season: string
}

export interface FeedDetailResponse {
    feed_id: number,
    title: string,
    content: null,
    tags: string[],
    season: string,
    nickname: string,
    created_at: string,
    like: boolean
}
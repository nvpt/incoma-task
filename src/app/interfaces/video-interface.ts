export interface VideoI {
    contentDetails?: {
        caption: string;
        definition: string;
        dimension: string;
        duration: string;
        licensedContent: boolean;
        projection: string;
    };
    etag: string;
    id: string;
    kind: string;
    snippet: {
        categoryId: string;
        channelId: string;
        channelTitle: string;
        defaultAudioLanguage: string;
        defaultLanguage: string;
        description: string;
        liveBroadcastContent: string;
        localized: {
            title: string;
            description: string;
        };
        publishedAt: string;
        tags: string[];
        thumbnails: {
            default: {
                height: number;
                url: string;
                width: number;
            };
            high: {
                height: number;
                url: string;
                width: number;
            };
            maxres?: {
                height: number;
                url: string;
                width: number;
            };
            medium?: {
                height: number;
                url: string;
                width: number;
            };
            standard?: {
                height: number;
                url: string;
                width: number;
            };
        };
        title: string;
        statistics?: {
            commentCount: string;
            dislikeCount: string;
            favoriteCount: string;
            likeCount: string;
            viewCount: string;
        };
    };
}

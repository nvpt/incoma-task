import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface VideoI {
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    kind: string;
    snippet: {
        channelId: string;
        channelTitle: string;
        description: string;
        liveBroadcastContent: string;
        publishedAt: string;
        thumbnails: {
            default: {
                height: number;
                url: string;
                width: number;
            };
            medium: {
                height: number;
                url: string;
                width: number;
            };
            high: {
                height: number;
                url: string;
                width: number;
            };
        };
        title: string;
    };
}

export interface VideoListResponseI {
    etag: string;
    items: VideoI[];
    kind: string;
    nextPageToken: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    regionCode: string;
}

@Injectable({
    providedIn: 'root'
})
export class YoutubeService {
    constructor(private http: HttpClient) {}

    /**
     *
     * @param maxResults
     */
    getVideoList(maxResults:number = 2): Observable<VideoListResponseI> {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&key=${Constants.YT_KEY}`;
        return this.http.get<VideoListResponseI>(url);
    }
}

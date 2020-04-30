import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface VideoI {
    //todo *** change interface
    etag: string;
    id: string;
    // {
    //     kind: string;
    //     videoId: string;
    // };
    kind: string;
    snippet: any;
    // {
    //     channelId: string;
    //     channelTitle: string;
    //     description: string;
    //     liveBroadcastContent: string;
    //     publishedAt: string;
    //     thumbnails: {
    //         default: {
    //             height: number;
    //             url: string;
    //             width: number;
    //         };
    //         medium: {
    //             height: number;
    //             url: string;
    //             width: number;
    //         };
    //         high: {
    //             height: number;
    //             url: string;
    //             width: number;
    //         };
    //     };
    title: string;
    // };
    statistics?: any;
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
    nextPageToken: string = '';

    constructor(private http: HttpClient) {}

    getVideoList(pageToken: string = this.nextPageToken, maxResults: number = 2, regionCode: string = 'RU'): Observable<any> {
        const url = `https://content.googleapis.com/youtube/v3/videos?chart=mostPopular&part=snippet%2CcontentDetails%2Cstatistics&locale=Russia&regionCode=${regionCode}&key=${Constants.YT_KEY}&pageToken=${pageToken}`;
        return this.http.get<VideoListResponseI>(url).pipe((response: any) => {
            this.nextPageToken = response.nextPageToken;
            return response;
        });
    }
}

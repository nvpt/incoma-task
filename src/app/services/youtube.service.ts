import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

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
    defaultCount: number = 2;
    defaultRegionCode: string = 'RU';

    constructor(private http: HttpClient) {}

    getVideoList(
        maxResults: number = this.defaultCount,
        regionCode: string = this.defaultRegionCode,
        pageToken: string = this.nextPageToken
    ): Observable<VideoListResponseI> {
        const url = `https://content.googleapis.com/youtube/v3/videos?chart=mostPopular&part=snippet%2CcontentDetails%2Cstatistics&maxResults=${maxResults}&locale=Russia&regionCode=${regionCode}&key=${Constants.YT_KEY}&pageToken=${pageToken}`;

        return this.http.get<VideoListResponseI>(url).pipe(
            tap((response: VideoListResponseI) => {
                this.nextPageToken = response.nextPageToken;
                return response;
            })
        );
    }
}

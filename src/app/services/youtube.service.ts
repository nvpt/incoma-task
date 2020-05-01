import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../constants';
import {VideoI} from '../interfaces/video-interface';

export interface VideoListResponseI {
    etag: string;
    items: VideoI[];
    kind: string;
    nextPageToken: string;
    prevPageToken: string;
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
    defaultPerRequestResult: number = 1;
    defaultSummaryResult: number = 50;
    defaultRegionCode: string = 'RU';

    constructor(private http: HttpClient) {}

    getVideoList(
        maxResults: number = this.defaultPerRequestResult,
        pageToken: string = this.nextPageToken,
        regionCode: string = this.defaultRegionCode
    ): Observable<VideoListResponseI> {
        const url = `https://content.googleapis.com/youtube/v3/videos?chart=mostPopular&part=snippet%2CcontentDetails%2Cstatistics&maxResults=${maxResults}&locale=Russia&regionCode=${regionCode}&key=${Constants.YT_KEY}&pageToken=${pageToken}`;

        return this.http.get<VideoListResponseI>(url);
    }
}

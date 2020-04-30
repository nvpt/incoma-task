import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
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

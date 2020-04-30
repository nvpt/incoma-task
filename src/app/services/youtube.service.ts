import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {Observable, of} from 'rxjs';
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
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${Constants.YT_KEY}&maxResults=${maxResults}&regionCode=RU&chart=mostPopular`;
        return this.http.get<VideoListResponseI>(url);
    }


    test():Observable<any>{
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&key=${Constants.YT_KEY}`;
        // const url = `https://www.googleapis.com/youtube/analytics/v1/reports?ids=channel%3D%3Dmine&start-date=2016-05-01&end-date=2016-09-01&metrics=views&dimensions=video&max-results=10&sort=-views&key=${Constants.YT_KEY}`
        return this.http.get<any>(url);
        // return of(null)
    }
}

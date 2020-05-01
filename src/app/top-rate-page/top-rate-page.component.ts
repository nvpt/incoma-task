import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {YoutubeService} from '../services/youtube.service';
import {LoaderService} from '../services/loader.service';
import {StorageService} from '../services/storage.service';
import {VideoI} from '../interfaces/video-interface';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-top-rate-page',
    templateUrl: './top-rate-page.component.html',
    styleUrls: ['./top-rate-page.component.scss']
})
export class TopRatePageComponent implements OnInit, OnDestroy {
    @ViewChild('list') list: ElementRef;

    videos: VideoI[] = [];
    filterValue: string = '';
    showOnlyFavorite: boolean = false;
    forceCallPipe: boolean = false;
    $videoSub: Subscription;

    constructor(public youtube: YoutubeService, public storageService: StorageService, private loader: LoaderService) {}

    ngOnInit(): void {
        this.$videoSub = this.getVideoList().subscribe();
    }

    ngOnDestroy(): void {
        this.$videoSub.unsubscribe();
    }

    get cancelScroll(): boolean {
        return (
            this.showOnlyFavorite ||
            this.videos.length >= this.youtube.defaultSummaryResult ||
            !this.youtube.nextPageToken
        );
    }

    getVideoList(): Observable<any> {
        this.loader.show();
        
        return this.youtube.getVideoList().pipe(
            tap(
                (response) => {
                    this.videos = [...this.videos, ...response.items];
                    this.youtube.nextPageToken = response.nextPageToken;
                    this.loader.hide();

                    //will load videos until we've got scroll
                    setTimeout(() => {
                        if (
                            !this.cancelScroll &&
                            this.list.nativeElement.scrollHeight === this.list.nativeElement.clientHeight
                        ) {
                            return this.getVideoList().subscribe();
                        }
                    }, 0);
                },
                () => {
                    this.loader.hide();
                },
                () => {
                    this.loader.hide();
                }
            )
        );
    }

    isItemFavorite(id: string): boolean {
        return this.storageService.isItemFavorite(id);
    }

    clearFavorites(): void {
        this.storageService.clearFavorites();
        this.showOnlyFavorite = false;
        this._forceCallPipe();
    }

    toggleFavorite(toggledId: string): void {
        this.storageService.toggleFavorite(toggledId);
        this._forceCallPipe();
    }

    private _forceCallPipe(): void {
        this.forceCallPipe = !this.forceCallPipe;
    }

    more() {
        this.getVideoList().subscribe(() => {
            this.scrollToBottom();
        });
    }

    scrollToBottom(): void {
        try {
            this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight - 10;
        } catch (err) {
            console.log(err);
        }
    }
}

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import {YoutubeService} from '../services/youtube.service';
import {LoaderService} from '../services/loader.service';
import {StorageService} from '../services/storage.service';
import {VideoI} from '../interfaces/video-interface';

@Component({
    selector: 'app-top-rate-page',
    templateUrl: './top-rate-page.component.html',
    styleUrls: ['./top-rate-page.component.scss']
})
export class TopRatePageComponent implements OnInit, OnDestroy {
    @ViewChild('list') list: ElementRef;

    videos: VideoI[] = [];
    videoIds: string[] = [];
    favoriteVideos: VideoI[] = [];
    searchValue: string = '';
    showOnlyFavorite: boolean = false;
    forceCallPipe: boolean = false;
    $videoSub: Subscription;

    constructor(public youtube: YoutubeService, public storageService: StorageService, private loader: LoaderService) {}

    ngOnInit(): void {
        this.getVideoList(false);
    }

    ngOnDestroy(): void {
        this.$videoSub.unsubscribe();
    }

    get cancelScrollableRequest(): boolean {
        return (
            this.showOnlyFavorite ||
            this.videos.length >= this.youtube.defaultSummaryResult ||
            !this.youtube.nextPageToken
        );
    }

    getVideoList(scrollBottom: boolean = true): void {
        this.loader.show();

        this.$videoSub = this.youtube.getVideoList().subscribe(
            (response) => {

                //it allows avoid duplication
                const uniqueVideos = response.items.filter((newVideo) =>
                    this.videos.every((video) => video.id !== newVideo.id)
                );
                this.videos = [...this.videos, ...uniqueVideos];

                this.youtube.nextPageToken = response.nextPageToken;
                this.loader.hide();


                setTimeout(() => {
                    scrollBottom && this.scrollToBottom();

                    //on initial step/after reload - will load videos until we've got scroll
                    if (
                        !this.cancelScrollableRequest &&
                        this.list.nativeElement.scrollHeight === this.list.nativeElement.clientHeight
                    ) {
                        this.getVideoList(scrollBottom);
                    }
                }, 0);
            },
            () => {
                this.loader.hide();
            },
            () => {
                this.loader.hide();
            }
        );
    }

    showFavorite(event): void {
        this.showOnlyFavorite = event;

        //define what favorite we haven't yet in downloaded
        const missingFavoriteVideoIds = this.storageService.storageObj.favorite.filter((id) =>
            this.videos.every((video) => video.id !== id)
        );


        if (missingFavoriteVideoIds.length) {
            this.loader.show();

            this.youtube.getFavoriteList(missingFavoriteVideoIds).subscribe(
                (response) => {

                    //it allows avoid duplication
                    const uniqueFavorites = response.items.filter((favVideo) =>
                        this.videos.every((video) => video.id !== favVideo.id)
                    );
                    this.videos = [...this.videos, ...uniqueFavorites];

                    this.loader.hide();
                },
                () => {
                    this.loader.hide();
                },
                () => {
                    this.loader.hide();
                }
            );
        }
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
        this.getVideoList();
    }

    scrollToBottom(): void {
        try {
            this.list.nativeElement.scrollTop =
                this.list.nativeElement.scrollHeight - this.list.nativeElement.clientHeight - 60;
        } catch (err) {
            console.log(err);
        }
    }
}

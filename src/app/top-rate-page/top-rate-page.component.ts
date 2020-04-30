import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
    filterValue: string = '';
    $videoSub: Subscription;

    constructor(
        private youtube: YoutubeService,
        private loader: LoaderService,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.getVideoList();
    }

    ngOnDestroy(): void {
        this.$videoSub.unsubscribe();
    }

    get cancelAddScroll():boolean {
        return this.isShowOnlyFavorite() || this.videos.length >= this.youtube.defaultSummaryResult || !this.youtube.nextPageToken;
    }

    getVideoList() {
        this.loader.show();
        this.$videoSub = this.youtube.getVideoList().subscribe(
            (res) => {
                console.log('43 >>> res: ', res);

                this.videos = [...this.videos, ...res.items];
                this.loader.hide();
            },
            () => {
                this.loader.hide();
            },
            () => {
                this.loader.hide();

                //we need scroll so will load videos until've got it
                setTimeout(() => {
                    if(this.list.nativeElement.scrollHeight === this.list.nativeElement.clientHeight){
                        this.getVideoList();
                    }
                }, 0);
            }
        );
    }

    isShowOnlyFavorite(): boolean {
        return this.storageService.isShowOnlyFavorite();
    }

    isItemFavorite(id: string): boolean {
        return this.storageService.isItemFavorite(id);
    }

    hasFavorite(): boolean {
        return this.storageService.hasFavorite();
    }

    clearFavorites(): void {
        this.storageService.clearFavorites();
    }

    toggle(toggledId: string): void {
        this.storageService.toggle(toggledId);
    }

    toggleOnlyFavoriteMode(): void {
        this.storageService.toggleOnlyFavoriteMode();
    }
}

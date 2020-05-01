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
    filterValue: string = '';
    $videoSub: Subscription;
    showOnlyFavorite: boolean = false;
    forceCallPipe: boolean = false;

    constructor(public youtube: YoutubeService, public storageService: StorageService, private loader: LoaderService) {}

    ngOnInit(): void {
        this.getVideoList();
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

    getVideoList() {
        this.loader.show();
        this.$videoSub = this.youtube.getVideoList().subscribe(
            (res) => {
                this.videos = [...this.videos, ...res.items];
                this.loader.hide();

                //we need scroll so will load videos until've got it
                // setTimeout(() => {
                //     if (
                //         !this.cancelScroll &&
                //         this.list.nativeElement.scrollHeight === this.list.nativeElement.clientHeight
                //     ) {
                //         this.getVideoList();
                //     }
                // }, 0);
            },
            () => {
                this.loader.hide();
            },
            () => {
                this.loader.hide();
            }
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

    toggle(toggledId: string): void {
        this.storageService.toggle(toggledId);
        this._forceCallPipe();
    }

    private _forceCallPipe() {
        this.forceCallPipe = !this.forceCallPipe;
    }
}

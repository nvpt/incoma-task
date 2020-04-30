import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {VideoI, YoutubeService} from '../services/youtube.service';
import {LoaderService} from '../services/loader.service';
import {StorageService} from '../services/storage.service';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit, OnDestroy {
    videos: VideoI[] = [];
    filterValue: string = '';
    $videoSub: Subscription;

    constructor(
        private youtube: YoutubeService,
        private loader: LoaderService,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        // this.getVideoList();
    }

    ngOnDestroy(): void {
        this.$videoSub.unsubscribe();
    }

    getVideoList() {
        this.loader.show();
        this.$videoSub = this.youtube.getVideoList().subscribe(
            (res) => {
                console.log('43 >>> res: ', res);
                
                this.videos = res.items;
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

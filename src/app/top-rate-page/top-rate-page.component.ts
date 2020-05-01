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
    showOnlyFavorite: boolean = false;

    constructor(
        private youtube: YoutubeService,
        private loader: LoaderService,
        public storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.getVideoList();
    }

    ngOnDestroy(): void {
        this.$videoSub.unsubscribe();
    }

    get cancelAddScroll():boolean {
        return this.showOnlyFavorite || this.videos.length >= this.youtube.defaultSummaryResult || !this.youtube.nextPageToken;
    }

    getVideoList() {
        console.log('39');
        
        this.loader.show();
        this.$videoSub = this.youtube.getVideoList().subscribe(
            (res) => {
                console.log('43 >>> res: ', res);

                this.videos = [...this.videos, ...res.items];
                console.log('45 >>> this.videos: ', this.videos);
                
                this.loader.hide();
                console.log('49');
                
                //we need scroll so will load videos until've got it
                //todo *** temp canceling
                // setTimeout(() => {
                //     if(!this.cancelAddScroll && this.list.nativeElement.scrollHeight === this.list.nativeElement.clientHeight){
                //         this.getVideoList();
                //     }
                // }, 1000);
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

    hasFavorite(): boolean {
        return this.storageService.hasFavorite();
    }

    clearFavorites(): void {
        this.storageService.clearFavorites();
    }

    toggle(toggledId: string): void {
        this.storageService.toggle(toggledId);
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Constants} from '../constants';
import {VideoI, YoutubeService} from '../services/youtube.service';
import {LoaderService} from '../services/loader.service';
import {StorageObjectI} from '../interfaces/storage-object-interface';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit, OnDestroy {
    videos: VideoI[] = [];
    filterValue: string = '';
    $videoSub: Subscription;

    constructor(private youtube: YoutubeService, private loader: LoaderService) {}

    ngOnInit(): void {
        // this.getVideoList();
        // this.test();
    }

    ngOnDestroy(): void {
        this.$videoSub.unsubscribe();
    }

    test() {
        this.youtube.test().subscribe((res) => {
            console.log('26 >>> res: ', res);
        });
    }

    get isShowOnlyFavorite(): boolean {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};

        if (storageData) {
            storageObj = JSON.parse(storageData);
            return storageObj.showOnlyFavorite;
        }

        return false;
    }

    getVideoList() {
        this.loader.show();
        this.$videoSub = this.youtube.getVideoList()
            .subscribe(
            (res) => {
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

    isItemFavorite(id: string): boolean {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};

        if (storageData) {
            storageObj = JSON.parse(storageData);
            return storageObj.favorite && storageObj.favorite.includes(id);
        }

        return false;
    }

    hasFavorite(): boolean {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};

        if (storageData) {
            storageObj = JSON.parse(storageData);
            return !!(storageObj.favorite && storageObj.favorite.length);
        }

        return false;
    }

    toggle($event: boolean, toggledId: string) {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};
        storageObj.favorite = [];

        if (storageData) {
            storageObj = JSON.parse(storageData);
            storageObj.favorite = storageObj.favorite || [];

            if (storageObj.favorite.includes(toggledId)) {
                storageObj.favorite = [...storageObj.favorite.filter((id) => id !== toggledId)];
            } else {
                storageObj.favorite.push(toggledId);
            }
        } else {
            storageObj.favorite.push(toggledId);
        }

        localStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(storageObj));
    }

    toggleOnlyFavoriteMode() {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};
        if (storageData) {
            storageObj = JSON.parse(storageData);
        }
        storageObj.showOnlyFavorite = !storageObj.showOnlyFavorite;
        localStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(storageObj));
    }
}

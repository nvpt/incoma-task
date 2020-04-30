import {Component, OnInit} from '@angular/core';
import {Constants} from '../constants';
import {VideoI, YoutubeService} from '../services/youtube.service';
import {LoaderService} from '../services/loader.service';
import {StorageObjectI} from '../interfaces/storage-object-interface';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
    videos: VideoI[] = [];
    filterValue: string = '';

    constructor(private youtube: YoutubeService, private loader: LoaderService) {}

    ngOnInit(): void {
        this.getVideoList();
    }

    getVideoList() {
        this.loader.show();
        this.youtube.getVideoList().subscribe((res) => {
            this.videos = res.items;
            this.loader.hide();
        });
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

    get hasFavorite(): boolean {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};

        if (storageData) {
            storageObj = JSON.parse(storageData);
            return !!(storageObj.favorite && storageObj.favorite.length);
        }

        return false;
    }

    isShowOnlyFavorite(): boolean {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};

        if (storageData) {
            storageObj = JSON.parse(storageData);
            return storageObj.showOnlyFavorite;
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
    //todo *** change showed list
        localStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(storageObj));
    }
}

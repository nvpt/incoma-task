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

    isSelected(id: string): boolean {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};

        if (storageData) {
            storageObj = JSON.parse(storageData);
            return storageObj.selected && storageObj.selected.includes(id);
        }

        return false;
    }

    toggle($event: boolean, toggledId: string) {
        const storageData = localStorage.getItem(Constants.STORAGE_KEY);
        let storageObj: StorageObjectI = <StorageObjectI>{};
        storageObj.selected = [];

        if (storageData) {
            storageObj = JSON.parse(storageData);

            if (storageObj.selected.includes(toggledId)) {
                storageObj.selected = [...storageObj.selected.filter((id) => id !== toggledId)];
            } else {
                storageObj.selected.push(toggledId);
            }
        } else {
            storageObj.selected.push(toggledId);
        }

        localStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(storageObj));
    }
}

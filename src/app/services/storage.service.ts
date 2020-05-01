import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {StorageObjectI} from '../interfaces/storage-object-interface';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storageData = localStorage.getItem(Constants.STORAGE_KEY);
    storageObj: StorageObjectI = <StorageObjectI>{};

    constructor() {
        if (this.storageData) {
            this.storageObj = JSON.parse(this.storageData);
        }
    }

    clearFavorites() {
        this.storageObj.favorite = [];
        this._updateStorage();
    }

    isItemFavorite(id: string): boolean {
        return this.storageObj.favorite && this.storageObj.favorite.includes(id);
    }

    toggleFavorite(toggledId: string): void {
        if (this.storageObj.favorite) {
            if (this.storageObj.favorite.includes(toggledId)) {
                this.storageObj.favorite = [...this.storageObj.favorite.filter((id) => id !== toggledId)];
            } else {
                this.storageObj.favorite.push(toggledId);
            }
        } else {
            this.storageObj.favorite = [];
            this.storageObj.favorite.push(toggledId);
        }

        this._updateStorage();
    }

    private _updateStorage() {
        localStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(this.storageObj));
    }
}

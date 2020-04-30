import {Injectable} from '@angular/core';
import {Constants} from '../constants';
import {StorageObjectI} from '../interfaces/storage-object-interface';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storageData = localStorage.getItem(Constants.STORAGE_KEY);
    private _storageObj: StorageObjectI = <StorageObjectI>{};

    constructor() {
        if(this._storageData){
            this._storageObj = JSON.parse(this._storageData);
        }
    }

    clearFavorites() {
        this._storageObj.favorite = [];
        this._updateStorage();
    }

    hasFavorite(): boolean {
        return !!(this._storageObj.favorite && this._storageObj.favorite.length);
    }

    isItemFavorite(id: string): boolean {
        return this._storageObj.favorite && this._storageObj.favorite.includes(id);
    }

    toggle(toggledId: string): void {
        if (this._storageObj.favorite.includes(toggledId)) {
            this._storageObj.favorite = [...this._storageObj.favorite.filter((id) => id !== toggledId)];
        } else {
            this._storageObj.favorite.push(toggledId);
        }

        this._updateStorage();
    }

    toggleOnlyFavoriteMode(): void {
        this._storageObj.showOnlyFavorite = !this._storageObj.showOnlyFavorite;
        this._updateStorage();
    }

    isShowOnlyFavorite(): boolean {
        return this._storageObj.showOnlyFavorite;
    }

    private _updateStorage(){
        localStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(this._storageObj));
    }
}

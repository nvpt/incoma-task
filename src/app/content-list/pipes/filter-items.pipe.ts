import {Pipe, PipeTransform} from '@angular/core';
import {VideoI} from '../../services/youtube.service';
import {Constants} from '../../constants';
import {StorageObjectI} from '../../interfaces/storage-object-interface';

@Pipe({
    name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {
    transform(elements: VideoI[], stringSearch: string = '', onlyFavorite: boolean = false): any[] {
        let result: VideoI[] = [...elements];

        //favorite filtering
        if (onlyFavorite) {
            const storageData = localStorage.getItem(Constants.STORAGE_KEY);
            let storageObj: StorageObjectI = <StorageObjectI>{};

            if (storageData) {
                storageObj = JSON.parse(storageData);
                storageObj.favorite = storageObj.favorite || [];

                result = [...result.filter((video) => storageObj.favorite.includes(video.id))];
            }
        }


        if (!stringSearch.trim()) {
            return result;
        }

        //search filtering
        result = [
            ...result.filter((element) => element.snippet.title.toLowerCase().includes(stringSearch.toLowerCase()))
        ];

        return result;
    }
}

import {Pipe, PipeTransform} from '@angular/core';
import {VideoI} from '../../services/youtube.service';

@Pipe({
    name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {
    transform(elements: VideoI[], stringSearch: string = ''): any[] {
        if (!stringSearch.trim()) {
            return elements;
        }

        return elements.filter((element) => element.snippet.title.toLowerCase().includes(stringSearch.toLowerCase()));
    }
}

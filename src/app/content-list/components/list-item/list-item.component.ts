import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {Constants} from '../../../constants';
import {VideoI} from '../../../services/youtube.service';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
    @Input() video?: VideoI;
    constants = Constants;
    selected: boolean = false;

    constructor(public sanitizer: DomSanitizer) {}

    ngOnInit(): void {}

    toggle(): void {
        this.selected = !this.selected;
    }
}

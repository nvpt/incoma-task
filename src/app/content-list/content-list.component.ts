import {Component, OnInit} from '@angular/core';
import {VideoI, YoutubeService} from '../services/youtube.service';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
    videos: VideoI[] = [];
    filterValue: string = '';

    constructor(private youtube: YoutubeService, ) {}

    ngOnInit(): void {
        // this.getVideoList();
    }

    getVideoList() {
        this.youtube.getVideoList().subscribe((res) => {
            console.log('18 >>> res: ', res);
            this.videos = res.items;
        });
    }
}

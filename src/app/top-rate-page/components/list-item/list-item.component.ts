import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Constants} from '../../../constants';
import {VideoI} from '../../../interfaces/video-interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() video: VideoI;
  @Input() favorite?: boolean;
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constants = Constants;

  toggle(): void {
    this.favorite = !this.favorite;
    this.onToggle.emit(this.favorite);
  }
}

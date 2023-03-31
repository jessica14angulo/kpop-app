import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Album } from '../album.model';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent {
  @Input() album: Album;
}

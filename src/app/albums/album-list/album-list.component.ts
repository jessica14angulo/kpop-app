import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from '../album.model';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  albums: Album[] = [];
  private subscription: Subscription;

  constructor(private albumService: AlbumService) {

  }

  ngOnInit() {
    this.subscription = this.albumService.albumListChangedEvent.subscribe(
      (albums: Album[]) => {
        this.albums = albums;
      }
    )
    this.albumService.getAlbums();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

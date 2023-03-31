import { Component } from '@angular/core';
import { Album } from '../album.model';
import { AlbumService } from '../album.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent {
  album: Album;
  nativeWindow: any;

  constructor(private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private windowRefService: WindRefService) {
  
      this.nativeWindow = windowRefService.getNativeWindow();
   }
   ngOnInit() {
     this.route.params
     .subscribe(
      (params: Params) => {
        this.album = this.albumService.getAlbum(params['id']);
      }
     )
   }
  
   onView() {
    if (this.album.url) {
      this.nativeWindow.open(this.album.url);
    }
   }
  
   onDelete() {
    this.albumService.deleteAlbum(this.album);
    this.router.navigate(['/albums'], {relativeTo: this.route});
   }
}

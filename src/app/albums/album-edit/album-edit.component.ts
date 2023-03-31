import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from '../album.model';
import { AlbumService } from '../album.service';
import { NgForm } from '@angular/forms'


@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {
  originalAlbum: Album;
  album: Album;
  editMode: boolean = false;

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute) {

}

ngOnInit() {
  this.route.params.subscribe (
    (params: Params) => {
       const id = params['id'];
       if (!id) {
        this.editMode = false;
          return
       }
          
       this.originalAlbum = this.albumService.getAlbum(id);
  
       if (!this.originalAlbum) {
        return
       }
       this.editMode = true;
       this.album = JSON.parse(JSON.stringify(this.originalAlbum));
    }) 
  }

  onSubmit(form: NgForm) {
    const values = form.value; // get values from form’s fields
    const newAlbum = new Album(
      null,
      values.name, 
      values.url, 
      values.imagePath);
  
    if (this.editMode === true) {
      this.albumService.updateAlbum(this.originalAlbum, newAlbum);
    } else{
     this.albumService.addAlbum(newAlbum);
    }
    this.router.navigate(['/albums'], {relativeTo: this.route})
 }

  onCancel() {
    this.router.navigate(['/albums'], {relativeTo: this.route});
  }
}

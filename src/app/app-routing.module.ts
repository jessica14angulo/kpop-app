import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { AlbumEditComponent } from './albums/album-edit/album-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/albums', pathMatch: 'full'},
  { path: 'albums', component: AlbumsComponent, children: [
    { path: 'new', component: AlbumEditComponent },
    { path: ':id', component: AlbumDetailComponent },
    { path: ':id/edit', component: AlbumEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

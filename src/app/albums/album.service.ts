import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Album } from './album.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums: Album[] = [];
  maxAlbumId: number;
  albumListChangedEvent = new Subject<Album[]>;

  constructor(private http: HttpClient) { 
    // this.maxAlbumId = this.getMaxId();
    // this.http.get<{message: string; albums: Album[]}>('http://localhost:3000/albums').subscribe(
    //   (reqalbums: any) => {
    //     this.albums = reqalbums.albums;
    //     this.maxAlbumId = this.getMaxId();
    //     //sort the list of documents
    //     this.albums.sort((a, b) => {
    //       if (a < b) {
    //         return -1;
    //       } else if (a > b) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //     //emit the next document list change event
    //     this.albumListChangedEvent.next(this.albums.slice());
    //   },
    //   // error method
    //   (error: any) => {
    //     //print the error to the console
    //     console.error(error);
    //   }
    // );
  }
  // getAlbums(): Album[]{
  //   return this.albums.slice();
  // }

  // getAlbum(index: number){
  //   return this.albums[index]
  // }




  getAlbums() {
    this.http.get<{ message: string, albums: Album[] }>('http://localhost:3000/albums')
      .subscribe(
        (albumData) => {
          this.albums = albumData.albums;
          this.albums.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0)
          this.albumListChangedEvent.next(this.albums.slice());
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  getAlbum(id: string): Album {
    for (const album of this.albums) {
      if (album.id === id) {
        return album;
      }
    }
    return null;
  }

  sortAndSend(){
    this.albums.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
  
          this.albumListChangedEvent.next(this.albums.slice());
  }

  getMaxId(): number {

    let maxId = 0

    for (const album of this.albums) {
      const currentId = +album.id
        if (currentId > maxId) {
          maxId = currentId
        }     
    }  
    return maxId
  }

  // addAlbum(album: Album) {
  //   if (!album) {
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   album.id = '';
  //   const strAlbum = JSON.stringify(album);

  //   this.http.post('http://localhost:3000/albums', strAlbum, { headers: headers })
  //     .subscribe(
  //       (albums: Album[]) => {
  //         this.albums = albums;
  //         this.albumListChangedEvent.next(this.albums.slice());
  //       });
  // }

  addAlbum(album: Album) {
    if (!album) {
      return;
    }

    // make sure id of the new album is empty
    album.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, album: Album }>('http://localhost:3000/albums',
      album,
      { headers: headers })
      .subscribe(
        (responseData) => {
          
          this.albums.push(responseData.album);
          this.sortAndSend();
        }
      );
  }

  // updateAlbum(originalAlbum: Album, newAlbum: Album) {
  //   if (!originalAlbum || !newAlbum) {
  //     return
  //   }
    
  //   const pos = this.albums.indexOf(originalAlbum)
  //   if (pos < 0) {
  //     return
  //   }
        
  //    //set headers
  //    const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   //convert album object to string
  //   const strAlbum = JSON.stringify(newAlbum);

  //   //send patch request with original album id, new album object and headers
  //   this.http.patch('http://localhost:3000/albums/' + originalAlbum.id
  //     , strAlbum
  //     , { headers: headers })
  //     //subscribe to response
  //     .subscribe(
  //       (albums: Album[]) => {
  //         //assign updated album list
  //         this.albums = albums;
  //         //emit change
  //         this.albumListChangedEvent.next(this.albums.slice());
  //       });
  // }

  updateAlbum(originalAlbum: Album, newAlbum: Album) {
    if (!originalAlbum || !newAlbum) {
      return;
    }

    const pos = this.albums.findIndex(d => d.id === originalAlbum.id);
    if (pos < 0) {
      return;
    }

    newAlbum.id = originalAlbum.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/albums/' + originalAlbum.id,
      newAlbum, { headers: headers })
      .subscribe(
        (response) => {
          this.albums[pos] = newAlbum;
          this.storeAlbums();
        }
      );
  }
  storeAlbums() {
    let docs = JSON.stringify(this.albums);
    this.http.put("https://kpop-app-7d016-default-rtdb.firebaseio.com/albums.json", docs, 
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    ).subscribe(
      () => {
        this.albumListChangedEvent.next(this.albums.slice())
      }
    );


  }

  deleteAlbum(album: Album) {
    if (!album) {
      return
    }

    const pos = this.albums.findIndex(d => d.id === album.id);

    if (pos < 0) {
      return;
    }
        
    this.http.delete('http://localhost:3000/albums/' + album.id)
    .subscribe(
      (response: Response) => {
        this.albums.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }

}

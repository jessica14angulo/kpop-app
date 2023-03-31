export class Album {
    public id: string;
    public name: string;
    public url: string;
    public imagePath: string;

    constructor(id: string, name: string, url: string, imagePath: string) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.imagePath = imagePath;
    }
}
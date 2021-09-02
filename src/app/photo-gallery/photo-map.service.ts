import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class MapService {
    private mapUrl = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';
    constructor(private http: HttpClient){

    }
    getMap(): Observable<any> {
        return this.http.get<any>(this.mapUrl);
    }
}
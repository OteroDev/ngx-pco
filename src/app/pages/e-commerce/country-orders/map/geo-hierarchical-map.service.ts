import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoHierarchicalMapService {
  private geoJsonUrl = 'assets/shapes_codlocal.geojson'; // URL do arquivo GeoJSON

  constructor(private http: HttpClient) {}

  loadGeoJson(): Observable<any> {
    return this.http.get(this.geoJsonUrl);
  }
}
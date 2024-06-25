import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'https://smarty.kerzz.com:4004/api/mock/getFeed';

  constructor(private http: HttpClient) { }

  getMenuItems(skip: number, limit: number,latitude: number,longitude: number): Observable<any> {
    const headers = new HttpHeaders({
      'apiKey': 'bW9jay04ODc3NTU2NjExMjEyNGZmZmZmZmJ2'
    });

    const body = {
      "skip": skip,
      "limit": limit,
      "latitude": latitude,
      "longitude": longitude
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  private url = 'http://localhost:3000/api/favoris';

  constructor(private http: HttpClient) { }

  addFavorite(plantId: number, userId: number) {
    return this.http.post(this.url, {plantId, userId});
  }

  getFavoritesForUser(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.url}/${userId}`);
  }

  deleteFavorite(userId: number, plantId: number): Observable<any> {
    return this.http.delete(`${this.url}/${userId}/${plantId}`);
  }
}

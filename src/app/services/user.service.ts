import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    createUser(newUser: User): Observable<any> { // On envoie le nouvel utilisateur au serveur
      const url = `http://localhost:3000/api/users/signup`;
      return this.http.post(url, newUser);
    }
    loginUser(user: any): Observable<any> { // On envoie l'utilisateur au serveur
      const url = `http://localhost:3000/api/users/login`;
      return this.http.post(url, user);
    }

    getIdUser(token: string): Observable<number> {
      return this.http.get<any>(`http://localhost:3000/api/users/getIdUser`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).pipe(
        map(response => response.id) // Suppose que la réponse est de la forme { id: 5 }
    );
    }
}

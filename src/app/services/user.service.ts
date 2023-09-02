import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
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
}

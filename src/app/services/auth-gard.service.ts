import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/api/users/checktoken';  // URL api

  constructor(private http: HttpClient) {}

  validateToken(token: string, email: string): Observable<any> { // On envoie le token et l'email au serveur pour vérifier si le token est valide
    const headers = new HttpHeaders({ // On envoie le token dans le header de la requête
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    const body = { // On envoie l'email dans le body de la requête
      email: email
    };
    
    return this.http.post(`${this.apiUrl}`, body, { headers }).pipe( 
        map(response => { // On retourne la réponse du serveur
            console.log('je suis dans guard service et la reponse du serveur', response);
            return response;
        }),
        catchError(error => { // Si le token n'est pas valide
            console.error('Erreur lors de la validation du token:', error);
            return throwError('Une erreur est survenue lors de la validation du token.');
        })
    );
}
}
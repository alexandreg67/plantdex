import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Plant } from '../models/plant';
import { InterfacePlant } from '../models/plant.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  url:string = `http://localhost:3000/api/plants/`;

  constructor(private http: HttpClient) { }

  getPlants(){
    return this.http.get<InterfacePlant>(this.url).pipe(map(e => e.data))
  };

  getPlantById(id: number) {
    return this.http.get<InterfacePlant>(this.url + id).pipe(map(e => e.data));
  }

  deletePlant(plantId: number): Observable<void> {
    const token = localStorage.getItem('token'); // On récupère le token dans le localStorage
    return this.http.delete<void>(this.url + plantId, {headers : { 'Authorization': `Bearer ${token}`}}); // On envoie le token dans le header de la requête
  }

  updatePlant(plantId: number, updatedPlant: Plant): Observable<Plant> { // On envoie la plante modifiée au serveur
    console.log(updatedPlant);
    const token = localStorage.getItem('token'); // On récupère le token dans le localStorage
    return this.http.put<Plant>(this.url + plantId, updatedPlant, {headers : { 'Authorization': `Bearer ${token}`}});
  }

  createPlant(newPlant: Plant): Observable<any> { // On envoie la nouvelle plante au serveur
    console.log(newPlant);
    const token = localStorage.getItem('token'); // On récupère le token dans le localStorage
    return this.http.post(this.url, newPlant, {headers : { 'Authorization': `Bearer ${token}`}}); // On envoie le token dans le header de la requête
  }

}
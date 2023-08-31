import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Plant } from '../models/plant';
import { InterfacePlant } from '../models/plant.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  getPlants(){
    return this.http.get<InterfacePlant>("http://localhost:3000/api/plants").pipe(map(e => e.data))
  };

  getPlantById(id: number) {
    return this.http.get<InterfacePlant>(`http://localhost:3000/api/plants/${id}`).pipe(map(e => e.data));
  }

  deletePlant(plantId: number): Observable<void> {
    const url = `http://localhost:3000/api/plants/${plantId}`;
    return this.http.delete<void>(url);
  }

  updatePlant(plantId: number, updatedPlant: Plant): Observable<Plant> {
    console.log(updatedPlant);
    const url = `http://localhost:3000/api/plants/${plantId}`;
    return this.http.put<Plant>(url, updatedPlant);
  }

  createPlant(newPlant: Plant): Observable<any> {
    const url = `http://localhost:3000/api/plants/`;
    return this.http.post(url, newPlant);
  }

}
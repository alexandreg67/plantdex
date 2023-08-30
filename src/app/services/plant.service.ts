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

  getPlants() : any {
    const response = this.http.get<InterfacePlant>("http://localhost:3000/api/plants").pipe(map(e => e.data))
        
    return response
  };

}
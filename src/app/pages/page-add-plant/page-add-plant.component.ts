import { Component } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';
 
@Component({
  selector: 'app-page-add-plant',
  templateUrl: './page-add-plant.component.html',
  styleUrls: ['./page-add-plant.component.css']
})
export class PageAddPlantComponent {
 plantsToDisplay!: Plant[];
  categories!: string[];
 
 constructor( private plantService: PlantService){}
 ngOnInit(): void {
    this.plantService.getPlants().subscribe((data: Plant[]) => {
      this.plantsToDisplay = data;
      this.categories = [... new Set(this.plantsToDisplay.map(e => e.categorie))];
    });
}}
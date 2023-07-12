import { Component, OnInit, Output } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit{

  plantsToDisplay: Plant[] = [];

  constructor(private plantService: PlantService) {}


  ngOnInit(): void {
    // this.plantService.getPlants().subscribe((plants: Plant[]) => {
    //   this.plantsToDisplay = plants;
    //   console.log(this.plantsToDisplay);
      
    // })

    const notreFluxDonnees = this.plantService.getPlants();
    notreFluxDonnees.subscribe((data: Plant[]) => {
      console.log('mes données après call api : ', data);

      this.plantsToDisplay = data;
      
    });
    

  }

}

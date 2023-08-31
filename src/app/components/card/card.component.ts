import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {

  @ViewChild('myModal') myModal!: ElementRef

  plantId!:number;
  plant!: any;
  plantName!:string;

  @Input() 
  planteAEnvoyer!:Plant;

  constructor(private plantService: PlantService) { }


  ngAfterViewInit(): void {
  // console.log("viewChild", this.myModal);
    
  }
  ajouterAuxFavoris(plant: Plant) {
    console.log("plant", this.planteAEnvoyer);
    this.plantId = plant.id;
    this.plantName = plant.nom;
    if (plant.favoris) {
      plant.favoris = false;
    }else {
      this.myModal.nativeElement.style.display = "block";
      plant.favoris = true;
    }
  }

  closeModal(): void {
    this.myModal.nativeElement.style.display = "none";
  }

  vueDetails(id: number) {
    return this.plantService.getPlantById(id).subscribe(
      plantData => {
        console.log(plantData);
        this.plant = plantData
      }
    )
  }

}



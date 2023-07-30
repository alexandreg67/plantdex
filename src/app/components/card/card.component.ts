import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Plant } from 'src/app/models/plant';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {

  @ViewChild('myModal') myModal!: ElementRef

  plantId!:number;
  plantName!:string;

  @Input() 
  planteAEnvoyer!:Plant;

  ngAfterViewInit(): void {
  console.log("viewChild", this.myModal);
    
  }
  ajouterAuxFavoris(plant: Plant) {
    this.myModal.nativeElement.style.display = "block";
    console.log("plant", this.planteAEnvoyer);
    this.plantId = plant.id;
    this.plantName = plant.nom;
    plant.favoris = true;
  }

  closeModal(): void {
    this.myModal.nativeElement.style.display = "none";
  }


}



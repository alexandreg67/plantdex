import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {

  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('detailsModal') detailsModal!: ElementRef;

  plantId!:number;
  plant!: any;
  plantName!:string;
  detailsName!: string;
  detailsCategorie!: string;
  detailsSoleil!: string;
  detailsArrosage!:number;
  detailsImage!: string;

  @Input() 
  planteAEnvoyer!:Plant;

  constructor(private plantService: PlantService, private router: Router) { }


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

  closeDetailsModal(): void {
    this.detailsModal.nativeElement.style.display = "none"; // On cache la modal des détails

  }

  vueDetails(plant: Plant) { // On récupère les données de la plante
      this.detailsModal.nativeElement.style.display = "block"; // On affiche la modal des détails
      this.detailsName = plant.nom;
      this.detailsCategorie = plant.categorie;
      this.detailsSoleil = plant.soleil;
      this.detailsArrosage = plant.arrosage;
      this.detailsImage = plant.image;

  }

}



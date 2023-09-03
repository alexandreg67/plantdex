import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Plant } from 'src/app/models/plant';
import { FavorisService } from 'src/app/services/favoris.service';
import { PlantService } from 'src/app/services/plant.service';
import { UserService } from 'src/app/services/user.service';

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
  favoris: number[] = [];

  @Input() 
  planteAEnvoyer!:Plant;

  constructor(
    private plantService: PlantService, 
    private router: Router, 
    private userService: UserService, 
    private favorisService: FavorisService) { }

    ngOnInit(): void {
      this.loadFavoris();
    }


  ngAfterViewInit(): void {
  // console.log("viewChild", this.myModal);
    
  }
  ajouterAuxFavoris(plant: Plant) { 
    console.log("plant", this.planteAEnvoyer);

    const token = localStorage.getItem('token'); // On récupère le token dans le localStorage

    if (!token) {
      console.log("Vous devez être connecté pour ajouter une plante aux favoris");
      return;
    }

    this.userService.getIdUser(token).subscribe((response: any) => {
      
      const userId = response;
      console.log("Je suis dans add favoris et je log userId : ", userId);
      console.log("Je suis dans add favoris et je log plant.id : ", plant.id);
      
      
      this.favorisService.addFavorite(plant.id, userId).subscribe((response: any) => {
        this.favoris.push(plant.id);
        console.log(response.message);
      })

    }) 
  }

  loadFavoris(): void {
    const token = localStorage.getItem('token'); // On récupère le token dans le localStorage
    if (!token) {
      console.log("Vous devez être connecté pour voir vos favoris");
      return;
    }

    this.userService.getIdUser(token).pipe(
      switchMap(userId => this.favorisService.getFavoritesForUser(userId))
    ).subscribe(favorisId => {
      this.favoris = favorisId;
    });
}

  isFavorite(plantId: number): boolean {
    return this.favoris.includes(plantId);
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



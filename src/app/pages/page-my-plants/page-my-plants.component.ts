import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { Plant } from 'src/app/models/plant';
import { FavorisService } from 'src/app/services/favoris.service';
import { PlantService } from 'src/app/services/plant.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-page-my-plants',
  templateUrl: './page-my-plants.component.html',
  styleUrls: ['./page-my-plants.component.css']
})
export class PageMyPlantsComponent {

  favoris: number[] = [];
  
  constructor(private plantService : PlantService, private userService: UserService, private favorisService: FavorisService ) { }

  ngOnInit(): void {
      this.loadFavoris(); // On charge les favoris
  }

  loadFavoris(): void {
    const token = localStorage.getItem('token'); // On récupère le token dans le localStorage
    if (!token) {
      console.log("Vous devez être connecté pour voir vos favoris");
      return;
    }
    this.userService.getIdUser(token).pipe(
      switchMap(userId => this.favorisService.getFavoritesForUser(userId)) // On récupère les favoris de l'utilisateur
      
    ).subscribe(favorisId => {
      this.favoris = favorisId; 
      
      console.log("Je suis dans loadFavoris my-plants et je log : ", this.favoris);
    });
}

}
import { Component } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-admintable',
  templateUrl: './admintable.component.html',
  styleUrls: ['./admintable.component.css']
})
export class AdmintableComponent {
    lignes: Plant[] = [];
    isEditing = false;

  constructor(private plantsService: PlantService) {}

ngOnInit() {
    // Au chargement de la page, on récupère les données des plantes depuis le service
    this.plantsService.getPlants().subscribe((data: Plant[]) => {
      console.log(data);
      this.lignes = data;

    });
  }

    editerLigne(index: number) {
        this.isEditing = !this.isEditing; // On active le mode édition
    }

    supprimerLigne(id: number, index: number) {
        const plantId = id;
        this.plantsService.deletePlant(plantId).subscribe(() => {
          this.lignes.splice(index, 1);
        })
    }

    confirmerChangements(id:number, newnom: string, newcategorie: string, newarrosage:number, newsoleil:string, newimage:string) {
        console.log("je suis dans confirmer changements et j'ai id, newnom, newcategorie, newarrosage, newsoleil, newimage", id, newnom, newcategorie, newarrosage, newsoleil, newimage);
        const newPlant: Plant = {
          id: id,
          nom: newnom,
          categorie: newcategorie,
          arrosage: newarrosage,
          soleil: newsoleil,
          image: newimage,
          favoris: true
        }
        this.plantsService.updatePlant(id, newPlant).subscribe(() => { // On envoie les données du formulaire au serveur
          console.log("mise à jour effectué");
          
        })
        this.isEditing = false; // On désactive le mode édition
    }
}

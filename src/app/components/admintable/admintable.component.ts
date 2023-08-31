import { Component } from '@angular/core';
import { Ligne } from '../../models/ligne.interface';
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
        this.isEditing = !this.isEditing;
    }

    supprimerLigne(id: number, index: number) {
        const plantId = id;
        this.plantsService.deletePlant(plantId).subscribe(() => {
          this.lignes.splice(index, 1);
        })
    }

    confirmerChangements(id:number, newnom: string, newcategorie: string, newarrosage:number, newsoleil:string, newimage:string) {
        // this.lignes[index] = {nom, categorie};
        // console.log(id, nom, categorie, arrosage, soleil, image);
        const newPlant: Plant = {
          id: id,
          nom: newnom,
          categorie: newcategorie,
          arrosage: newarrosage,
          soleil: newsoleil,
          image: newimage,
          favoris: true
        }
        this.plantsService.updatePlant(id, newPlant).subscribe(() => {
          console.log("mise à jour effectué");
          
        })
        this.isEditing = false;
    }
}

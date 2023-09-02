import { Component, Input } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plant } from 'src/app/models/plant';
 
 
@Component({
 
  selector: 'app-plantform',
 
  templateUrl: './plantform.component.html',
 
  styleUrls: ['./plantform.component.css']
 
})
 
export class PlantformComponent {
imageChoice: string = 'url'; // valeur par défaut
 
@Input() categories!: string[]
  constructor(private formBuilder: FormBuilder, private plantService: PlantService) {}
 
  plantForm: FormGroup = this.formBuilder.group({
 
    nom: ['', [Validators.required ]],
 
    categorie: ['', [Validators.required]],
 
    soleil: ['', [Validators.required]],
 
    arrosage: [0, [Validators.required]],
 
    image: ['', [Validators.required]]
 
  });


  submit() { // Envoi du formulaire de création d'une nouvelle plante
    const newPlant: Plant = this.plantForm.value; // On récupère les données du formulaire
    this.plantService.createPlant(newPlant).subscribe(() => { 
          console.log("mise à jour effectué");
          
        })

    console.log("submit form plant", this.plantForm.value);
    this.plantForm.reset(); // On vide le formulaire
    
  }
}

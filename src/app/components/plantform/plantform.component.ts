import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plantform',
  templateUrl: './plantform.component.html',
  styleUrls: ['./plantform.component.css']
})
export class PlantformComponent {

  constructor (private formBuilder: FormBuilder, private plantservice: PlantService) {}

  plantForm: FormGroup = this.formBuilder.group({
    nom: [''],
    soleil: [''],
    arrosage: [0],
    image: [''],
    categorie: ['']
  });


  submit() {
    const newPlant: Plant = this.plantForm.value;
    this.plantservice.createPlant(newPlant).subscribe(() => {
          console.log("mise à jour effectué");
          
        })

    console.log("submit form plant", this.plantForm.value);
    this.plantForm.reset();
    
  }
}

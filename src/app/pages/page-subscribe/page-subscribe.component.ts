import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-subscribe',
  templateUrl: './page-subscribe.component.html',
  styleUrls: ['./page-subscribe.component.css']
})
export class PageSubscribeComponent { // Création d'un nouvel utilisateur

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

    submitForm: FormGroup = this.formBuilder.group({ // Création du formulaire de création d'un nouvel utilisateur
 
    nom: ['', [Validators.required ]],
 
    prenom: ['', [Validators.required]],
 
    email: ['', [Validators.required]],
 
    password: [0, [Validators.required]],
    
    repeatPassword: [0, [Validators.required]],
  });


  submit() { // Envoi du formulaire de création d'un nouvel utilisateur
    const newUser: User = this.submitForm.value; // On récupère les données du formulaire
    console.log( "je suis dans le submit, newUser = ", newUser);
    this.userService.createUser(newUser).subscribe(() => { // On envoie les données du formulaire au serveur
          console.log("mise à jour effectué");
        })

    this.submitForm.reset(); // On vide le formulaire
    
  }
  annuler() {; 
    window.history.back(); // On retourne à la page précédente
  }
  
}

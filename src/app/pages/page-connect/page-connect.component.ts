import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.css']
})
export class PageConnectComponent {

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

    loginForm: FormGroup = this.formBuilder.group({ // Création du formulaire de connexion
 
    email: ['', [Validators.required ]],
 
    password: ['', [Validators.required]],
 
 
  });


  submit() { // Envoi du formulaire de connexion
  const userLogin: User = this.loginForm.value; // On récupère les données du formulaire
  console.log( "je suis dans le submit, userLogin = ", userLogin);
  this.userService.loginUser(userLogin).subscribe((res) => { // On envoie les données du formulaire au serveur
    console.log("connexion réussie");
    const token = res.data; // On récupère le token
    const userEmail = userLogin.email; // On récupère l'e-mail de l'utilisateur

    // Stocker le token et l'e-mail dans le localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', userEmail);

    console.log('Token:', token);
    console.log('User Email:', userEmail);

    this.loginForm.reset(); // On vide le formulaire
  });
}

}

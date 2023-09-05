import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isUserLoggedIn: boolean | undefined;

  ngOnInit(): void {
      this.isUserLoggedIn = !!localStorage.getItem('token'); // On vérifie si l'utilisateur est connecté
  }

  logout() {
  // Votre logique de déconnexion ici
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.isUserLoggedIn = false;
  }

}
